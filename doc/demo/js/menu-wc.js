'use strict';



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

customElements.define('compodoc-menu', function (_HTMLElement) {
    _inherits(_class, _HTMLElement);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.isNormalMode = _this.getAttribute('mode') === 'normal';
        return _this;
    }

    _createClass(_class, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.render(this.isNormalMode);
        }
    }, {
        key: 'render',
        value: function render(isNormalMode) {
            let tp = lithtml.html(
'<nav>\n    <ul class="list">\n        <li class="title">\n            \n                <a href="index.html" data-type="index-link">rucken:demo</a>\n            \n        </li>\n\n        <li class="divider"></li>\n        ' + (isNormalMode ? '<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>' : '') + '\n        <li class="chapter">\n            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>\n            <ul class="links">\n                \n                    <li class="link">\n                        <a href="overview.html" data-type="chapter-link">\n                            <span class="icon ion-ios-keypad"></span>Overview\n                        </a>\n                    </li>\n                    <li class="link">\n                        <a href="index.html" data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>README\n                        </a>\n                    </li>\n                \n                \n                    <li class="link">\n                        \n                            <a href="changelog.html"\n                        \n                        data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>CHANGELOG\n                        </a>\n                    </li>\n                \n                    <li class="link">\n                        \n                            <a href="license.html"\n                        \n                        data-type="chapter-link">\n                            <span class="icon ion-ios-paper"></span>LICENSE\n                        </a>\n                    </li>\n                \n                \n                    <li class="link">\n                        <a href="dependencies.html"\n                            data-type="chapter-link">\n                            <span class="icon ion-ios-list"></span>Dependencies\n                        </a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n        <li class="chapter modules">\n            <a data-type="chapter-link" href="modules.html">\n                <div class="menu-toggler linked" data-toggle="collapse"\n                    ' + (isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"') + '>\n                    <span class="icon ion-ios-archive"></span>\n                    <span class="link-name">Modules</span>\n                    <span class="icon ion-ios-arrow-down"></span>\n                </div>\n            </a>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"') + '>\n                \n                    <li class="link">\n                        <a href="modules/AccountPageModule.html" data-type="entity-link">AccountPageModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-AccountPageModule-80b716a3ed182255ecd7886d3824a99b"' : 'data-target="#xs-components-links-module-AccountPageModule-80b716a3ed182255ecd7886d3824a99b"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-AccountPageModule-80b716a3ed182255ecd7886d3824a99b"' : 'id="xs-components-links-module-AccountPageModule-80b716a3ed182255ecd7886d3824a99b"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/AccountPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountPageComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/AdminPageModule.html" data-type="entity-link">AdminPageModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-AdminPageModule-39f501b588c0480c007aad85199b5061"' : 'data-target="#xs-components-links-module-AdminPageModule-39f501b588c0480c007aad85199b5061"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-AdminPageModule-39f501b588c0480c007aad85199b5061"' : 'id="xs-components-links-module-AdminPageModule-39f501b588c0480c007aad85199b5061"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/AdminPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminPageComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/AppBrowserModule.html" data-type="entity-link">AppBrowserModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-AppBrowserModule-72a4959befb11b4b073de45e0225835f"' : 'data-target="#xs-components-links-module-AppBrowserModule-72a4959befb11b4b073de45e0225835f"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-AppBrowserModule-72a4959befb11b4b073de45e0225835f"' : 'id="xs-components-links-module-AppBrowserModule-72a4959befb11b4b073de45e0225835f"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-AppModule-a667a1af0d89078971cba30b63396f74"' : 'data-target="#xs-components-links-module-AppModule-a667a1af0d89078971cba30b63396f74"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-AppModule-a667a1af0d89078971cba30b63396f74"' : 'id="xs-components-links-module-AppModule-a667a1af0d89078971cba30b63396f74"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/AppServerModule.html" data-type="entity-link">AppServerModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-AppServerModule-0ecd476c86a51a7e74af89c7ebb326a4"' : 'data-target="#xs-components-links-module-AppServerModule-0ecd476c86a51a7e74af89c7ebb326a4"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-AppServerModule-0ecd476c86a51a7e74af89c7ebb326a4"' : 'id="xs-components-links-module-AppServerModule-0ecd476c86a51a7e74af89c7ebb326a4"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/ContentTypesFrameModule.html" data-type="entity-link">ContentTypesFrameModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-ContentTypesFrameModule-e794230420a07af56cf0723fdd77e9c9"' : 'data-target="#xs-components-links-module-ContentTypesFrameModule-e794230420a07af56cf0723fdd77e9c9"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-ContentTypesFrameModule-e794230420a07af56cf0723fdd77e9c9"' : 'id="xs-components-links-module-ContentTypesFrameModule-e794230420a07af56cf0723fdd77e9c9"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/ContentTypesFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypesFrameComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/EntitiesPageModule.html" data-type="entity-link">EntitiesPageModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-EntitiesPageModule-bd702f1803b84f62c7fed7300fa21312"' : 'data-target="#xs-components-links-module-EntitiesPageModule-bd702f1803b84f62c7fed7300fa21312"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-EntitiesPageModule-bd702f1803b84f62c7fed7300fa21312"' : 'id="xs-components-links-module-EntitiesPageModule-bd702f1803b84f62c7fed7300fa21312"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/EntitiesPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntitiesPageComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/GroupsFrameModule.html" data-type="entity-link">GroupsFrameModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-GroupsFrameModule-5c441e35b175bbff91ca14326ad4447a"' : 'data-target="#xs-components-links-module-GroupsFrameModule-5c441e35b175bbff91ca14326ad4447a"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-GroupsFrameModule-5c441e35b175bbff91ca14326ad4447a"' : 'id="xs-components-links-module-GroupsFrameModule-5c441e35b175bbff91ca14326ad4447a"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/GroupsFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupsFrameComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/HomePageModule.html" data-type="entity-link">HomePageModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-HomePageModule-23a60d19fbcba6e3f7827d4a05844454"' : 'data-target="#xs-components-links-module-HomePageModule-23a60d19fbcba6e3f7827d4a05844454"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-HomePageModule-23a60d19fbcba6e3f7827d4a05844454"' : 'id="xs-components-links-module-HomePageModule-23a60d19fbcba6e3f7827d4a05844454"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/HomePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/PermissionsFrameModule.html" data-type="entity-link">PermissionsFrameModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-PermissionsFrameModule-c146ad2b9ebdadef400f4746d9be6d2b"' : 'data-target="#xs-components-links-module-PermissionsFrameModule-c146ad2b9ebdadef400f4746d9be6d2b"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-PermissionsFrameModule-c146ad2b9ebdadef400f4746d9be6d2b"' : 'id="xs-components-links-module-PermissionsFrameModule-c146ad2b9ebdadef400f4746d9be6d2b"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/PermissionsFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionsFrameComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/ProfileFrameModule.html" data-type="entity-link">ProfileFrameModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-ProfileFrameModule-f032d26284b33d17729a4cb6983262d3"' : 'data-target="#xs-components-links-module-ProfileFrameModule-f032d26284b33d17729a4cb6983262d3"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-ProfileFrameModule-f032d26284b33d17729a4cb6983262d3"' : 'id="xs-components-links-module-ProfileFrameModule-f032d26284b33d17729a4cb6983262d3"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/ProfileFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileFrameComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/ThemesPageModule.html" data-type="entity-link">ThemesPageModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-ThemesPageModule-1cb57a1b74370ee3072a68e44f7f9046"' : 'data-target="#xs-components-links-module-ThemesPageModule-1cb57a1b74370ee3072a68e44f7f9046"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-ThemesPageModule-1cb57a1b74370ee3072a68e44f7f9046"' : 'id="xs-components-links-module-ThemesPageModule-1cb57a1b74370ee3072a68e44f7f9046"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/ThemesPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThemesPageComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n                    <li class="link">\n                        <a href="modules/UsersFrameModule.html" data-type="entity-link">UsersFrameModule</a>\n                        \n                            <li class="chapter inner">\n                                <div class="simple menu-toggler" data-toggle="collapse"\n                                    ' + (isNormalMode ? 'data-target="#components-links-module-UsersFrameModule-030bcf5c2dfdf6555f2c4b77a7d478e5"' : 'data-target="#xs-components-links-module-UsersFrameModule-030bcf5c2dfdf6555f2c4b77a7d478e5"') + '>\n                                    <span class="icon ion-md-cog"></span>\n                                    <span>Components</span>\n                                    <span class="icon ion-ios-arrow-down"></span>\n                                </div>\n                                <ul class="links collapse"\n                                    ' + (isNormalMode ? 'id="components-links-module-UsersFrameModule-030bcf5c2dfdf6555f2c4b77a7d478e5"' : 'id="xs-components-links-module-UsersFrameModule-030bcf5c2dfdf6555f2c4b77a7d478e5"') + '>\n                                    \n                                        <li class="link">\n                                            <a href="components/UsersFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersFrameComponent</a>\n                                        </li>\n                                    \n                                </ul>\n                            </li>\n                        \n                        \n                        \n                        \n                        \n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n        \n        \n        \n        \n        \n            \n                <li class="chapter">\n                    <div class="simple menu-toggler" data-toggle="collapse"\n                        ' + (isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"') + '>\n                        <span class="icon ion-md-arrow-round-down"></span>\n                        <span>Injectables</span>\n                        <span class="icon ion-ios-arrow-down"></span>\n                    </div>\n                    <ul class="links collapse"\n                    ' + (isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"') + '>\n                        \n                            <li class="link">\n                                <a href="injectables/CustomErrorHandler.html" data-type="entity-link">CustomErrorHandler</a>\n                            </li>\n                        \n                    </ul>\n                </li>\n            \n        \n        \n        \n        \n        \n        \n        <li class="chapter">\n            <div class="simple menu-toggler" data-toggle="collapse"\n            ' + (isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"') + '>\n                <span class="icon ion-ios-cube"></span>\n                <span>Miscellaneous</span>\n                <span class="icon ion-ios-arrow-down"></span>\n            </div>\n            <ul class="links collapse"\n            ' + (isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"') + '>\n                \n                \n                    <li class="link">\n                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>\n                    </li>\n                \n                \n                \n                    <li class="link">\n                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>\n                    </li>\n                \n            </ul>\n        </li>\n        \n        \n            \n        \n        \n        <li class="chapter">\n            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>\n        </li>\n        \n        \n        \n        <li class="divider"></li>\n        <li class="copyright">\n                Documentation generated using <a href="https://compodoc.app/" target="_blank">\n                    \n                        \n                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">\n                        \n                    \n                </a>\n        </li>\n        \n    </ul>\n</nav>'
);
        this.innerHTML = tp.strings;
        }
    }]);

    return _class;
}(HTMLElement));