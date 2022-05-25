(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function DynamicAdapt(type) {
        this.type = type;
    }
    DynamicAdapt.prototype.init = function() {
        const _this = this;
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        this.nodes = document.querySelectorAll("[data-da]");
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }
        this.arraySort(this.оbjects);
        this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
            return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }), this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        }));
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ",");
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                return item.breakpoint === mediaBreakpoint;
            }));
            matchMedia.addListener((function() {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            }));
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };
    DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
        if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        } else for (let i = оbjects.length - 1; i >= 0; i--) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
    };
    DynamicAdapt.prototype.moveTo = function(place, element, destination) {
        element.classList.add(this.daClassname);
        if ("last" === place || place >= destination.children.length) {
            destination.insertAdjacentElement("beforeend", element);
            return;
        }
        if ("first" === place) {
            destination.insertAdjacentElement("afterbegin", element);
            return;
        }
        destination.children[place].insertAdjacentElement("beforebegin", element);
    };
    DynamicAdapt.prototype.moveBack = function(parent, element, index) {
        element.classList.remove(this.daClassname);
        if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
    };
    DynamicAdapt.prototype.indexInParent = function(parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };
    DynamicAdapt.prototype.arraySort = function(arr) {
        if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) return 0;
                if ("first" === a.place || "last" === b.place) return -1;
                if ("last" === a.place || "first" === b.place) return 1;
                return a.place - b.place;
            }
            return a.breakpoint - b.breakpoint;
        })); else {
            Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return 1;
                    if ("last" === a.place || "first" === b.place) return -1;
                    return b.place - a.place;
                }
                return b.breakpoint - a.breakpoint;
            }));
            return;
        }
    };
    const da = new DynamicAdapt("max");
    da.init();
    function qe(name) {
        return document.querySelector(`${name}`);
    }
    const header = qe(".header");
    const menuMobile = qe(".bottom-header__nav");
    const searchForm = qe(".top-header__form");
    const langBlock = qe(".top-header__lang-list");
    qe(".mainscreen");
    let script_bodyLockStatus = true;
    let script_innerWidth = window.innerWidth;
    window.addEventListener("resize", resize);
    document.addEventListener("click", documentActions);
    function documentActions(e) {
        const target = e.target;
        if (script_innerWidth > 991.98) if (target.closest(".top-header__loupe")) {
            if (searchForm) {
                target.closest("form").classList.add("search-open");
                setTimeout((() => {
                    target.closest("form").querySelector("button").setAttribute("type", "submit");
                }), 0);
            }
        } else if (!target.closest("form")) if (searchForm && searchForm.classList.contains("search-open")) {
            searchForm.classList.remove("search-open");
            searchForm.querySelector("button").setAttribute("type", "button");
        }
        if (target.closest(".top-header__lang-link_ru")) {
            e.preventDefault();
            target.closest("ul").querySelector(".top-header__lang-link_ua").classList.remove("active");
            target.classList.add("active");
            document.documentElement.classList.remove("lang-ua");
            document.documentElement.classList.add("lang-ru");
        } else if (target.closest(".top-header__lang-link_ua")) {
            e.preventDefault();
            target.closest("ul").querySelector(".top-header__lang-link_ru").classList.remove("active");
            target.classList.add("active");
            document.documentElement.classList.remove("lang-ru");
            document.documentElement.classList.add("lang-ua");
        }
        if (script_bodyLockStatus && target.closest(".bottom-header__icon")) {
            script_bodyLockToggle();
            document.documentElement.classList.toggle("menu-open");
        }
    }
    if (langBlock) langBlock.querySelectorAll("a").forEach((item => {
        if (item.classList.contains("active")) {
            const text = item.innerText.toLowerCase();
            document.documentElement.classList.add(`lang-${text}`);
        }
    }));
    function resize() {
        script_innerWidth = window.innerWidth;
        if (menuMobile) if (script_innerWidth < 991.98) {
            menuMobile.style.paddingTop = `${(header.offsetHeight + 20) / 16}rem`;
            menuMobile.style.paddingBottom = `${30 / 16}rem`;
        } else {
            menuMobile.style.removeProperty("padding-top");
            menuMobile.style.removeProperty("padding-bottom");
        }
        if (searchForm && script_innerWidth < 991.98) {
            searchForm.classList.add("search-open");
            searchForm.querySelector("button").setAttribute("type", "submit");
        } else {
            searchForm.classList.remove("search-open");
            searchForm.querySelector("button").setAttribute("type", "button");
        }
    }
    resize();
    function script_bodyLockToggle(delay = 500) {
        if (document.documentElement.classList.contains("lock")) script_bodyUnlock(delay); else script_bodyLock(delay);
    }
    function script_bodyUnlock(delay) {
        if (script_bodyLockStatus) {
            script_bodyLockStatus = false;
            setTimeout((() => {
                document.documentElement.classList.remove("lock");
                script_bodyLockStatus = true;
            }), delay);
        }
    }
    function script_bodyLock(delay) {
        if (script_bodyLockStatus) {
            document.documentElement.classList.add("lock");
            script_bodyLockStatus = false;
            setTimeout((() => {
                script_bodyLockStatus = true;
            }), delay);
        }
    }
    window["FLS"] = true;
    isWebp();
})();