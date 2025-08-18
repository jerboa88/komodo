// ==UserScript==
// @name         Komodo - Mods for Komoot
// @namespace    https://github.com/jerboa88
// @version      1.0.0
// @author       John Goodliff
// @description  A userscript that adds additional features for route planning on Komoot.com.
// @license      MIT
// @icon         data:image/png;base64,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
// @homepage     https://johng.io/p/komodo
// @homepageURL  https://johng.io/p/komodo
// @source       https://github.com/jerboa88/komodo.git
// @supportURL   https://github.com/jerboa88/komodo/issues
// @match        https://www.komoot.com/user/*/routes
// @match        https://www.komoot.com/tour/*
// @grant        none
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const e=document.createElement("style");e.textContent=o,document.head.append(e)})(' :root{--komodo-spacing: .375rem;--komodo-pill-bg-color: var(--theme-ui-colors-primary);--komodo-pill-text-color: var(--theme-ui-colors-textOnDark);--komodo-button-bg-color: var(--theme-ui-colors-white);--komodo-button-border-color: var(--komodo-button-bg-color);--komodo-button-text-color: var(--theme-ui-colors-secondary);--komodo-button-hover-bg-color: rgba(0, 119, 217, .1);--komodo-button-hover-border-color: #0065b8;--komodo-button-hover-text-color: #0065b8;--komodo-button-disabled-bg-color: var(--theme-ui-colors-muted);--komodo-button-disabled-border-color: var(--komodo-button-disabled-bg-color);--komodo-button-disabled-text-color: var(--theme-ui-colors-disabled)}dialog[data-test-id=rename-tour-dialog]>div{width:100%;max-width:64rem}.komodo-filter-container{flex-wrap:wrap;gap:var(--komodo-spacing)}.komodo-filter-container>button{margin-right:0!important}div:has(>a[href="/upload"]){align-items:center}.komodo-hide{display:none}.komodo-tag-filter-container{flex:1 1 auto;display:flex;flex-wrap:wrap;gap:var(--komodo-spacing)}.komodo-tag-filter{border-width:1px;font-weight:700;border-radius:8px;flex:1 1 0%;background-color:var(--theme-ui-colors-card);color:var(--theme-ui-colors-text);border-color:var(--theme-ui-colors-black20)}.komodo-tag-filter:hover{border-color:var(--theme-ui-colors-black30)}.komodo-tag-filter>p{align-items:center;display:flex;flex-direction:row;gap:1.5rem;justify-content:space-between;padding:1rem;width:initial;align-self:stretch}.komodo-tag-filter>div{border-bottom-width:1px;border-color:var(--theme-ui-colors-border);border-style:solid;width:100%;justify-self:stretch}.komodo-tag-filter>fieldset{align-items:stretch;display:flex;flex-direction:column;gap:.75rem;justify-content:end;padding:1rem;width:initial;align-self:stretch}.komodo-tag-filter>fieldset>label{align-items:center;border-color:var(--theme-ui-colors-border);border-radius:8px;border-style:solid;color:var(--theme-ui-colors-text);cursor:pointer;display:flex;flex-direction:row;gap:1.5rem;grid-area:grid-item-0;justify-content:space-between;padding:.5rem;width:initial;align-self:stretch;border-width:1px}.komodo-tag-filter>fieldset>label:hover{border-color:var(--theme-ui-colors-whisper)}.komodo-tag-filter>fieldset>label:has(input[type=checkbox][value=true]){color:var(--theme-ui-colors-primary)}.komodo-tag-filter>fieldset>label:has(input[type=checkbox][value=false]){color:var(--theme-ui-colors-error)}.komodo-tag-filter>fieldset>label>input[type=checkbox][value=true]{accent-color:var(--komodo-pill-bg-color)}.komodo-tag-filter>fieldset>label>input[type=checkbox][value=false]{accent-color:var(--theme-ui-colors-error)}.komodo-tag-filter>select{display:block;width:fit-content;margin-top:var(--komodo-spacing)}.komodo-pill{align-items:center;background-color:var(--komodo-pill-bg-color);border-radius:4px;color:var(--komodo-pill-text-color);display:inline-flex;justify-content:center;min-width:2em;text-align:center;font-size:12px;font-weight:700;padding:.25em .5em;text-transform:inherit;flex-shrink:0}.komodo-tag-pill-container{display:flex;flex-wrap:wrap;margin-top:var(--komodo-spacing);gap:var(--komodo-spacing)}.komodo-tag-pill-container>.komodo-pill>div>span:nth-child(2){white-space:pre}.komodo-button{align-items:center;appearance:none;background-color:var(--komodo-button-bg-color);border-color:var(--komodo-button-border-color);border-radius:8px;border-style:solid;color:var(--komodo-button-text-color);cursor:pointer;display:inline-flex;justify-content:center;pointer-events:auto;text-align:center;width:unset;border-width:.0625rem;text-decoration:none;transition:all .2s;font-size:16px;font-weight:700;line-height:1.5rem;padding:.4375rem .6875rem}.komodo-button:hover{background-color:var(--komodo-button-hover-bg-color);border-color:var(--komodo-button-hover-border-color);color:var(--komodo-button-hover-text-color)}.komodo-button:disabled{cursor:default;background-color:var(--komodo-button-disabled-bg-color);border-color:var(--komodo-button-disabled-border-color);color:var(--komodo-button-disabled-text-color)}.komodo-button>svg{color:inherit}.komodo-button>span{display:inline-flex;text-align:center;flex-flow:column;padding-left:.25rem;padding-right:0}.komodo-new{position:relative}.komodo-new:after{content:"\u{1F98E}";position:absolute;top:0;right:calc(var(--komodo-spacing) * -1);z-index:1;font-size:small;line-height:0} ');

(function () {
  'use strict';

  const PROJECT = {
    EMOJI: "🦎",
    NAME: "Komodo"
  };
  const prefix = PROJECT.NAME.toLowerCase();
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
  const SCRIPT_NAME = `${PROJECT.EMOJI} ${PROJECT.NAME}`;
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
  const assertDefined = (value, message = "Value is not defined") => {
    if (value == null) throw new Error(message);
    return value;
  };
  const toElementId = (value) => {
    if (!value) {
      return "id_empty";
    }
    const validChar = /^[a-zA-Z0-9\-_:.]+$/;
    let result = "";
    for (const ch of value) {
      if (validChar.test(ch)) {
        result += ch;
      } else {
        const code = ch.codePointAt(0)?.toString(16).padStart(4, "0");
        result += `_u${code}_`;
      }
    }
    if (!/^[a-zA-Z]/.test(result)) {
      result = `id_${result}`;
    }
    return result;
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
  const createTriStateCheckbox = (() => {
    const stateMap = {
      null: null,
      true: true,
      false: false
    };
    const states = Object.values(stateMap);
    const updateCheckboxState = (checkbox, checkedState) => {
      checkbox.checked = checkedState === true;
      checkbox.indeterminate = checkedState === false;
      checkbox.value = String(checkedState);
    };
    return (id, initialCheckedState, onClick) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = id;
      checkbox.addEventListener("click", () => {
        let checkedState = stateMap[checkbox.value] ?? null;
        const newCheckedStateIndex = (states.indexOf(checkedState) + 1) % states.length;
        checkedState = states[newCheckedStateIndex];
        updateCheckboxState(checkbox, checkedState);
        onClick(checkedState);
      });
      updateCheckboxState(checkbox, initialCheckedState);
      return checkbox;
    };
  })();
  const showElement = (element, visible) => {
    const shouldHide = !visible;
    const isHidden = element.classList.contains(CLASS.HIDE);
    if (isHidden === shouldHide) {
      return false;
    }
    element.classList.toggle(CLASS.HIDE, shouldHide);
    return true;
  };
  const onReactMounted = (callback) => {
    const canaryClassName = "ReactModalPortal";
    const continueCall = () => {
      debug("React has been mounted");
      callback();
    };
    const canaries = document.body.getElementsByClassName(canaryClassName);
    if (canaries.length > 0) {
      continueCall();
      return;
    }
    const observer = new MutationObserver((mutations) => {
      debug("Mutations observed on body", mutations);
      for (const mutation of mutations) {
        for (const newNode of mutation.addedNodes) {
          if (newNode instanceof HTMLElement && newNode.classList.contains(canaryClassName)) {
            observer.disconnect();
            continueCall();
            return;
          }
        }
      }
    });
    debug("Waiting for React to be mounted");
    observer.observe(document.body, { childList: true });
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
    tagNameToValueMap = /* @__PURE__ */ new Map();
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
     * Convert a list of tags to a map of tag names to sets of tag values.
     *
     * @param tags - An array of tags
     * @returns A map of tag names to sets of tag values
     */
    static tagsToTagValueSetMap(tags) {
      const tagNameToValueSetMap = /* @__PURE__ */ new Map();
      for (const { name, value } of tags) {
        const existingValuesSet = tagNameToValueSetMap.get(name);
        if (!existingValuesSet) {
          const newValuesSet = /* @__PURE__ */ new Set([value]);
          tagNameToValueSetMap.set(name, newValuesSet);
        } else if (!existingValuesSet.has(value)) {
          existingValuesSet.add(value);
        }
      }
      return tagNameToValueSetMap;
    }
    /**
     * Adds a single tag to the tag manager.
     *
     * @param tag - The tag to add.
     * @returns `true` if the tag was added, `false` if it already existed.
     */
    add(tag) {
      let updated = false;
      if (this.tagNameToValueMap.has(tag.name)) {
        const values = this.tagNameToValueMap.get(tag.name);
        if (!values.has(tag.value)) {
          values.set(tag.value, null);
          updated = true;
        }
      } else {
        const tagValueToInclusionMap = /* @__PURE__ */ new Map([[tag.value, null]]);
        this.tagNameToValueMap.set(tag.name, tagValueToInclusionMap);
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
     * @returns An iterable of all tags and their values.
     */
    getAll() {
      return this.tagNameToValueMap.entries();
    }
    /**
     * Sets the inclusion value for a given tag name and tag value.
     *
     * @param tagName - The name of the tag to update.
     * @param tagValue - The value of the tag to update.
     * @param isIncluded - The new inclusion value (`true`, `false`, or `null`).
     * @returns `true` if the value was set, `false` if the tag/value does not exist.
     */
    setTagValueInclusion(tagName, tagValue, isIncluded) {
      const tagValueToInclusionMap = this.tagNameToValueMap.get(tagName);
      if (!tagValueToInclusionMap || !tagValueToInclusionMap.has(tagValue)) {
        return false;
      }
      tagValueToInclusionMap.set(tagValue, isIncluded);
      return true;
    }
    /**
     * Checks if a list of tags matches the current filters.
     *
     * @param tags - The list of tags to check.
     * @returns `true` if the tags match the filters, `false` otherwise.
     */
    matchesFilters(tags) {
      const routeTagMap = TagManager.tagsToTagValueSetMap(tags);
      for (const [
        tagName,
        tagValueToInclusionMap
      ] of this.tagNameToValueMap.entries()) {
        const routeTagValuesSet = routeTagMap.get(tagName);
        for (const [
          tagValue,
          tagIsIncluded
        ] of tagValueToInclusionMap.entries()) {
          if (tagIsIncluded === false && routeTagValuesSet?.has(tagValue)) {
            debug(
              `Excluding for reason: '${tagName}: ${tagValue}' prohibited by filter`
            );
            return false;
          }
          if (tagIsIncluded === true && !routeTagValuesSet?.has(tagValue)) {
            debug(
              `Excluding for reason: '${tagName}: ${tagValue}' required by filter`
            );
            return false;
          }
        }
      }
      return true;
    }
  }
  const pattern$1 = /^\/user\/\d*?\/routes$/;
  const init$1 = async () => {
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
    const createTagFilterSet = (tagName, tagValueToInclusionMap) => {
      const container = document.createElement("fieldset");
      const sortedTagValueEntries = [...tagValueToInclusionMap.entries()].sort(
        ([tagValueA], [tagValueB]) => tagValueA.localeCompare(tagValueB)
      );
      for (const [tagValue, isIncluded] of sortedTagValueEntries) {
        const handleClick = (checkedState) => {
          tagManager.setTagValueInclusion(tagName, tagValue, checkedState);
          applyFilters();
        };
        const checkboxId = `${toElementId(tagName)}-${toElementId(tagValue)}`;
        const checkbox = createTriStateCheckbox(
          checkboxId,
          isIncluded,
          handleClick
        );
        const label = document.createElement("label");
        const span = document.createElement("span");
        span.textContent = tagValue;
        label.dataset[DATA_ATTRIBUTE.TAG_VALUE] = tagValue;
        label.appendChild(span);
        label.appendChild(checkbox);
        container.appendChild(label);
      }
      return container;
    };
    const createTagFiltersContainer = () => {
      debug("Creating tag filters container");
      const tagFiltersContainer = document.createElement("form");
      tagFiltersContainer.classList.add(CLASS.TAG_FILTER_CONTAINER);
      for (const [tagName, tagValueToInclusionMap] of tagManager.getAll()) {
        const tagFilter = document.createElement("div");
        tagFilter.classList.add(CLASS.NEW, CLASS.TAG_FILTER);
        tagFilter.dataset[DATA_ATTRIBUTE.TAG_NAME] = tagName;
        const filterSetTitle = document.createElement("p");
        const divider = document.createElement("div");
        filterSetTitle.textContent = tagName;
        tagFilter.appendChild(filterSetTitle);
        tagFilter.appendChild(divider);
        const container = createTagFilterSet(tagName, tagValueToInclusionMap);
        tagFilter.appendChild(container);
        tagFiltersContainer.appendChild(tagFilter);
      }
      return tagFiltersContainer;
    };
    const updateTagFilterControls = () => {
      debug("Updating tag filter controls on page");
      const filterContainer = document.querySelector(
        '#js-filter-anchor div:not([data-bottomsheet-scroll-ignore="true"]):has(> button:not([type="button"])'
      );
      const existingTagFilterContainer = filterContainer?.getElementsByClassName(
        CLASS.TAG_FILTER_CONTAINER
      )?.[0];
      const tagFilterControls = createTagFiltersContainer();
      existingTagFilterContainer ? existingTagFilterContainer.replaceWith(tagFilterControls) : filterContainer?.appendChild(tagFilterControls);
      filterContainer?.classList.add(CLASS.FILTER_CONTAINER);
    };
    const parseLiTitle = (a) => {
      if (!a) {
        warn("No a element found in li element", a);
        return [];
      }
      const originalTitle = a.textContent;
      const { text, tags } = TagManager.extractTags(originalTitle);
      a.textContent = text;
      a.title = originalTitle;
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
      const pill = createPill();
      const container = document.createElement("div");
      const nameSpan = document.createElement("span");
      const separatorSpan = document.createElement("span");
      const valueSpan = document.createElement("span");
      nameSpan.textContent = tag.name;
      separatorSpan.textContent = ": ";
      valueSpan.textContent = tag.value;
      pill.dataset[DATA_ATTRIBUTE.TAG_NAME] = tag.name;
      pill.dataset[DATA_ATTRIBUTE.TAG_VALUE] = tag.value;
      container.appendChild(nameSpan);
      container.appendChild(separatorSpan);
      container.appendChild(valueSpan);
      pill.appendChild(container);
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
      const doesMatchFilter = tagManager.matchesFilters(tags);
      const wasVisibilityChanged = showElement(li, doesMatchFilter);
      if (wasVisibilityChanged) {
        const msgPrefix = doesMatchFilter ? "Showing" : "Hiding";
        debug(`${msgPrefix} li element: ${li.dataset[DATA_ATTRIBUTE.TOUR_ID]}`);
      }
    };
    const applyFilters = () => {
      debug("Applying filters");
      const lis = getLis();
      for (const li of lis) {
        const tags = parseLiTagPills(li);
        filterLi(li, tags);
      }
    };
    debug("Setting up route list page");
    const observer = new MutationObserver((mutations) => {
      debug("Mutations observed on ul", mutations);
      for (const mutation of mutations) {
        for (const newNode of mutation.addedNodes) {
          if (newNode.nodeName === "LI") {
            updateLi(newNode);
          }
        }
      }
    });
    debug("Waiting for li elements to be added to the list");
    observer.observe(ul, { childList: true });
    getLis().forEach(updateLi);
    addLoadAllRoutesButton();
    updateTagFilterControls();
  };
  const handler$1 = () => onReactMounted(init$1);
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