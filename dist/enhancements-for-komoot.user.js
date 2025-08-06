// ==UserScript==
// @name         Enhancements for Komoot
// @namespace    https://github.com/jerboa88
// @version      0.1.0
// @author       John Goodliff
// @description  A userscript that adds additional features for route planning on Komoot.com.
// @license      MIT
// @icon         ../src/logo.svg
// @homepage     https://johng.io/p/enhancements-for-komoot
// @homepageURL  https://johng.io/p/enhancements-for-komoot
// @source       https://github.com/jerboa88/enhancements-for-komoot.git
// @supportURL   https://github.com/jerboa88/enhancements-for-komoot/issues
// @match        https://www.komoot.com/user/*/routes
// @match        https://www.komoot.com/tour/*
// @grant        none
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const o=document.createElement("style");o.textContent=e,document.head.append(o)})(' :root{--efk-spacing: .375rem;--efk-pill-bg-color: var(--theme-ui-colors-primary);--efk-pill-text-color: var(--theme-ui-colors-textOnDark);--efk-button-bg-color: var(--theme-ui-colors-white);--efk-button-border-color: var(--efk-button-bg-color);--efk-button-text-color: var(--theme-ui-colors-secondary);--efk-button-hover-bg-color: rgba(0, 119, 217, .1);--efk-button-hover-border-color: #0065b8;--efk-button-hover-text-color: #0065b8;--efk-button-disabled-bg-color: var(--theme-ui-colors-muted);--efk-button-disabled-border-color: var(--efk-button-disabled-bg-color);--efk-button-disabled-text-color: var(--theme-ui-colors-disabled)}.efk-filter-container{flex-wrap:wrap;gap:var(--efk-spacing)}.efk-filter-container>button{margin-right:0!important}div:has(>a[href="/upload"]){align-items:center}.efk-hide{display:none}.efk-tag-filter-container{flex:1 1 auto;display:flex;flex-wrap:wrap;gap:var(--efk-spacing)}.efk-tag-filter{border-width:1px;font-weight:700;border-radius:8px;padding:.5rem 1rem;flex:1 1 0%;background-color:var(--theme-ui-colors-card);color:var(--theme-ui-colors-text);border-color:var(--theme-ui-colors-black20)}.efk-tag-filter:hover{border-color:var(--theme-ui-colors-black30)}.efk-tag-filter>label{font-weight:700}.efk-tag-filter>select{display:block;width:100%;margin-top:var(--efk-spacing)}.efk-tag-pill-container{display:flex;flex-wrap:wrap;margin-top:var(--efk-spacing);gap:var(--efk-spacing)}.efk-pill{align-items:center;background-color:var(--efk-pill-bg-color);border-radius:4px;color:var(--efk-pill-text-color);display:inline-flex;justify-content:center;min-width:2em;text-align:center;font-size:12px;font-weight:700;padding:.25em .5em;text-transform:inherit;flex-shrink:0}.efk-button{align-items:center;appearance:none;background-color:var(--efk-button-bg-color);border-color:var(--efk-button-border-color);border-radius:8px;border-style:solid;color:var(--efk-button-text-color);cursor:pointer;display:inline-flex;justify-content:center;pointer-events:auto;text-align:center;width:unset;border-width:.0625rem;text-decoration:none;transition:all .2s;font-size:16px;font-weight:700;line-height:1.5rem;padding:.4375rem .6875rem}.efk-button:hover{background-color:var(--efk-button-hover-bg-color);border-color:var(--efk-button-hover-border-color);color:var(--efk-button-hover-text-color)}.efk-button:disabled{cursor:default;background-color:var(--efk-button-disabled-bg-color);border-color:var(--efk-button-disabled-border-color);color:var(--efk-button-disabled-text-color)}.efk-button>svg{color:inherit}.efk-button>span{display:inline-flex;text-align:center;flex-flow:column;padding-left:.25rem;padding-right:0}.efk-new{position:relative}.efk-new:after{content:"\u{1F98E}";position:absolute;top:0;right:calc(var(--efk-spacing) * -1);z-index:1;font-size:small;line-height:0} ');

(function () {
  'use strict';

  const SCRIPT_NAME = "🦎 EfK";
  const buildLogPrefix = (() => {
    const htmlNode = window.getComputedStyle(document.documentElement);
    const colorMap = {
      primary: htmlNode.getPropertyValue("--theme-ui-colors-primaryOnDark"),
      debug: htmlNode.getPropertyValue("--theme-ui-colors-info"),
      info: htmlNode.getPropertyValue("--theme-ui-colors-success"),
      warn: htmlNode.getPropertyValue("--theme-ui-colors-warning"),
      error: htmlNode.getPropertyValue("--theme-ui-colors-error")
    };
    return (severity) => [
      `%c${SCRIPT_NAME} %c${severity}`,
      `font-style:italic;color:${colorMap.primary};`,
      `color:${colorMap[severity]};`
    ];
  })();
  const buildLogFn = (severity) => {
    const logFn = console[severity];
    const logPrefix = buildLogPrefix(severity);
    return (...args) => logFn(...logPrefix, ...args);
  };
  const debug = buildLogFn("debug");
  const warn = buildLogFn("warn");
  const prefix = "efk";
  const CLASS = {
    NEW: `${prefix}-new`,
    HIDE: `${prefix}-hide`,
    FILTER_CONTAINER: `${prefix}-filter-container`,
    TAG_FILTER_CONTAINER: `${prefix}-tag-filter-container`,
    TAG_FILTER: `${prefix}-tag-filter`,
    TAG_PILL_CONTAINER: `${prefix}-tag-pill-container`,
    PILL: `${prefix}-pill`,
    BUTTON: `${prefix}-button`
  };
  const DATA_ATTRIBUTE = {
    // Built-in
    TOUR_ID: "tourId",
    TAG_NAME: `${prefix}TagName`,
    TAG_VALUE: `${prefix}TagValue`
  };
  const assertDefined = (value, message = "Value is not defined") => {
    if (value == null) throw new Error(message);
    return value;
  };
  const createElementTemplate = (nullableReferenceElement) => {
    const referenceElement = assertDefined(
      nullableReferenceElement,
      "Unable to create element template. Reference element not found"
    );
    const elementTemplate = referenceElement.cloneNode(true);
    elementTemplate.classList.add(CLASS.NEW);
    return elementTemplate;
  };
  const createPill = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    div.classList.add(CLASS.NEW, CLASS.PILL);
    return div;
  };
  const createButton = (text, icon, handleClick) => {
    const button = document.createElement("button");
    const span = document.createElement("span");
    span.textContent = text;
    button.onclick = (event) => {
      debug("Button clicked");
      handleClick(event, button, span, icon);
    };
    button.classList.add(CLASS.NEW, CLASS.BUTTON);
    button.appendChild(icon);
    button.appendChild(span);
    return button;
  };
  const createMultiSelect = (name, optionObjs, handleChange) => {
    const select = document.createElement("select");
    select.id = name;
    select.multiple = true;
    select.size = Math.min(5, optionObjs.length);
    const sortedValues = [...optionObjs].sort(
      (a, b) => a.value.localeCompare(b.value)
    );
    for (const { value, selected } of sortedValues) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      option.selected = selected;
      select.appendChild(option);
    }
    select.onchange = handleChange;
    return select;
  };
  const showElement = (element, visible) => {
    element.classList.toggle(CLASS.HIDE, !visible);
  };
  class Tag {
    constructor(name, value) {
      this.name = name;
      this.value = value;
    }
    toString() {
      return `${this.name}: ${this.value}`;
    }
  }
  const TAG_REGEX = /\[\s*([^:[\]]+?)\s*:\s*([^:[\]]+?)\s*\]/g;
  class TagManager {
    tagValuesMap = /* @__PURE__ */ new Map();
    filteredTagValuesMap = /* @__PURE__ */ new Map();
    /**
     * Parses a string for tags and returns the remaining text and the extracted tags.
     *
     * @param text - The text to parse.
     * @returns An object containing the remaining text and the extracted tags.
     */
    static extractTags(text) {
      const tags = [];
      const matches = text.matchAll(TAG_REGEX);
      for (const match of matches) {
        tags.push(new Tag(match[1], match[2]));
      }
      return {
        text: text.replace(TAG_REGEX, "").trim(),
        tags
      };
    }
    /**
     * Adds a single tag to the tag manager.
     *
     * @param tag - The tag to add.
     * @returns `true` if the tag was added, `false` if it already existed.
     */
    add(tag) {
      let updated = false;
      if (this.tagValuesMap.has(tag.name)) {
        const values = this.tagValuesMap.get(tag.name);
        if (!values.has(tag.value)) {
          values.add(tag.value);
          updated = true;
        }
      } else {
        this.tagValuesMap.set(tag.name, /* @__PURE__ */ new Set([tag.value]));
        updated = true;
      }
      return updated;
    }
    /**
     * Adds multiple tags to the tag manager.
     *
     * @param tags - The tags to add.
     * @returns `true` if any of the tags were added, `false` if all of them already existed.
     */
    addMultiple(tags) {
      return tags.map((t) => this.add(t)).some(Boolean);
    }
    /**
     * Gets all tags and their values.
     *
     * @returns An array of all tags and their values.
     */
    getAll() {
      return [...this.tagValuesMap.entries()];
    }
    /**
     * Sets a list of values to filter by for a given tag name.
     *
     * @param tagName - The name of the tag to filter by.
     * @param values - The values to filter by.
     * @returns The new Map of filtered values.
     */
    setFilteredValuesSet(tagName, values) {
      this.filteredTagValuesMap.set(tagName, values);
    }
    /**
     * Gets the list of values to filter by for a given tag name.
     *
     * @param tagName - The name of the tag to filter by.
     * @returns The list of values to filter by.
     */
    getFilteredValuesSet(tagName) {
      return this.filteredTagValuesMap.get(tagName) ?? /* @__PURE__ */ new Set();
    }
    /**
     * Checks if a list of tags matches the current filters.
     *
     * @param tags - The list of tags to check.
     * @returns `true` if the tags match the filters, `false` otherwise.
     */
    matchesFilters(tags) {
      for (const [tagName, values] of this.filteredTagValuesMap.entries()) {
        if (values.size === 0) continue;
        if (!tags.some((tag) => tag.name === tagName && values.has(tag.value))) {
          return false;
        }
      }
      return true;
    }
  }
  const pattern$1 = /^\/user\/\d*?\/routes$/;
  const handler$1 = async () => {
    const tagManager = new TagManager();
    const savedRoutesAnchor = assertDefined(
      document.querySelector(
        'a[href^="/user/"][href$="/routes"]'
      ),
      "No saved routes link found"
    );
    const ul = assertDefined(
      document.querySelector(
        'ul[data-test-id="tours-list"]'
      ),
      "No route list found"
    );
    const getLis = () => [...ul.children].filter((li) => li.nodeName === "LI");
    const scrollToLoadAll = async () => {
      debug("Force loading all routes");
      const initialScrollPos = window.scrollY;
      const totalNumOfRoutes = Number(
        assertDefined(
          savedRoutesAnchor.lastElementChild?.textContent,
          "Unable to get total number of routes. Required element not found"
        )
      );
      debug(`Found ${totalNumOfRoutes} total routes`);
      const loadMore = async () => {
        ul.scrollTop = ul.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 100));
        return totalNumOfRoutes > getLis().length;
      };
      while (await loadMore()) ;
      debug(`Restoring scroll position: ${initialScrollPos}`);
      window.scrollTo(0, initialScrollPos);
    };
    const addLoadAllRoutesButton = () => {
      debug("Adding load all routes button to page");
      const importLinkAnchor = document.querySelector(
        'a[href="/upload"]'
      );
      const container = assertDefined(importLinkAnchor.parentElement);
      const icon = createElementTemplate(
        savedRoutesAnchor.firstElementChild
      );
      const loadAllRoutesbutton = createButton(
        "Load All Routes",
        icon,
        async (_event, button, span) => {
          button.disabled = true;
          span.textContent = "Loading...";
          await scrollToLoadAll();
          span.textContent = "Loaded";
        }
      );
      container.insertBefore(loadAllRoutesbutton, importLinkAnchor);
    };
    const createTagSelect = (name, values) => {
      const optionObjs = [...values].map((value) => ({
        value,
        selected: tagManager.getFilteredValuesSet(name).has(value) ?? false
      }));
      const select = createMultiSelect(name, optionObjs, (event) => {
        const target = event.currentTarget;
        const selectedValuesSet = new Set(
          [...target.selectedOptions].map((o) => o.value)
        );
        tagManager.setFilteredValuesSet(name, selectedValuesSet);
        applyFilters();
      });
      return select;
    };
    const createTagSelectContainer = () => {
      debug("Creating tag select container");
      const tagFilterContainer = document.createElement("div");
      tagFilterContainer.classList.add(CLASS.TAG_FILTER_CONTAINER);
      for (const [name, values] of tagManager.getAll()) {
        const tagFilter = document.createElement("div");
        tagFilter.classList.add(CLASS.NEW, CLASS.TAG_FILTER);
        const label = document.createElement("label");
        label.textContent = name;
        label.htmlFor = name;
        tagFilter.appendChild(label);
        const select = createTagSelect(name, values);
        tagFilter.appendChild(select);
        tagFilterContainer.appendChild(tagFilter);
      }
      return tagFilterContainer;
    };
    const updateTagFilterControls = () => {
      debug("Updating tag filter controls on page");
      const filterContainer = document.querySelector(
        '#js-filter-anchor div:not([data-bottomsheet-scroll-ignore="true"]):has(> button:not([type="button"])'
      );
      const existingTagFilterContainer = filterContainer?.getElementsByClassName(
        CLASS.TAG_FILTER_CONTAINER
      )?.[0];
      const tagFilterControls = createTagSelectContainer();
      existingTagFilterContainer ? existingTagFilterContainer.replaceWith(tagFilterControls) : filterContainer?.appendChild(tagFilterControls);
      filterContainer?.classList.add(CLASS.FILTER_CONTAINER);
    };
    const parseLiTitle = (a) => {
      if (!a) {
        warn("No a element found in li element", a);
        return [];
      }
      const { text, tags } = TagManager.extractTags(a.textContent);
      a.textContent = text;
      return tags;
    };
    const parseLiTagPills = (li) => {
      const pills = li.getElementsByClassName(
        CLASS.PILL
      );
      if (!pills.length) return [];
      return [...pills].map((pill) => {
        const name = assertDefined(
          pill.dataset[DATA_ATTRIBUTE.TAG_NAME],
          `No tag name found in pill: ${pill.textContent}`
        );
        const value = assertDefined(
          pill.dataset[DATA_ATTRIBUTE.TAG_VALUE],
          `No tag value found in pill: ${pill.textContent}`
        );
        return new Tag(name, value);
      });
    };
    const createTagPill = (tag) => {
      const pill = createPill(tag.toString());
      pill.dataset[DATA_ATTRIBUTE.TAG_NAME] = tag.name;
      pill.dataset[DATA_ATTRIBUTE.TAG_VALUE] = tag.value;
      return pill;
    };
    const createTagPillContainer = (tags) => {
      const div = document.createElement("div");
      tags.forEach((tag) => div.appendChild(createTagPill(tag)));
      div.classList.add(CLASS.TAG_PILL_CONTAINER);
      return div;
    };
    const updateLi = (li) => {
      debug("Updating li element");
      const a = assertDefined(
        li.querySelector(
          'a[data-test-id="tours_list_item_title"]'
        ),
        "No a element found in li element"
      );
      const tags = parseLiTitle(a);
      const wasTagMapUpdated = tagManager.addMultiple(tags);
      a.parentElement?.appendChild(createTagPillContainer(tags));
      if (wasTagMapUpdated) {
        updateTagFilterControls();
      }
      filterLi(li, tags);
    };
    const filterLi = (li, tags) => {
      const visible = tagManager.matchesFilters(tags);
      const msgPrefix = visible ? "Showing" : "Hiding";
      debug(`${msgPrefix} li element: ${li.dataset[DATA_ATTRIBUTE.TOUR_ID]}`);
      showElement(li, visible);
    };
    const applyFilters = () => {
      debug("Applying filters");
      const lis = getLis();
      for (const li of lis) {
        const tags = parseLiTagPills(li);
        filterLi(li, tags);
      }
    };
    const init2 = async () => {
      debug("Setting up route list page");
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const newNode of mutation.addedNodes) {
            if (newNode.nodeName === "LI") {
              updateLi(newNode);
            }
          }
        }
      });
      observer.observe(ul, { childList: true });
      getLis().forEach(updateLi);
      addLoadAllRoutesButton();
      updateTagFilterControls();
    };
    init2();
  };
  const routeListRoute = {
    pattern: pattern$1,
    handler: handler$1
  };
  const pattern = /^\/tour\/\d*?/;
  const handler = async () => {
    debug("Setting up route page");
  };
  const routeViewRoute = {
    pattern,
    handler
  };
  const registerRouteHandlers = (routes) => {
    const path = location.pathname;
    for (const { pattern: pattern2, handler: handler2 } of routes) {
      if (pattern2.test(path)) {
        handler2();
        break;
      }
    }
  };
  const init = () => {
    debug("Script loaded");
    registerRouteHandlers([routeViewRoute, routeListRoute]);
    debug("Script unloaded");
  };
  init();

})();