'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">rucken:demo</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="changelog.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>CHANGELOG
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AccountPageModule.html" data-type="entity-link">AccountPageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AccountPageModule-80b716a3ed182255ecd7886d3824a99b"' : 'data-target="#xs-components-links-module-AccountPageModule-80b716a3ed182255ecd7886d3824a99b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AccountPageModule-80b716a3ed182255ecd7886d3824a99b"' : 'id="xs-components-links-module-AccountPageModule-80b716a3ed182255ecd7886d3824a99b"' }>
                                        <li class="link">
                                            <a href="components/AccountPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountPageComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AdminPageModule.html" data-type="entity-link">AdminPageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AdminPageModule-39f501b588c0480c007aad85199b5061"' : 'data-target="#xs-components-links-module-AdminPageModule-39f501b588c0480c007aad85199b5061"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AdminPageModule-39f501b588c0480c007aad85199b5061"' : 'id="xs-components-links-module-AdminPageModule-39f501b588c0480c007aad85199b5061"' }>
                                        <li class="link">
                                            <a href="components/AdminPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminPageComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppBrowserModule.html" data-type="entity-link">AppBrowserModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppBrowserModule-72a4959befb11b4b073de45e0225835f"' : 'data-target="#xs-components-links-module-AppBrowserModule-72a4959befb11b4b073de45e0225835f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppBrowserModule-72a4959befb11b4b073de45e0225835f"' : 'id="xs-components-links-module-AppBrowserModule-72a4959befb11b4b073de45e0225835f"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-a667a1af0d89078971cba30b63396f74"' : 'data-target="#xs-components-links-module-AppModule-a667a1af0d89078971cba30b63396f74"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-a667a1af0d89078971cba30b63396f74"' : 'id="xs-components-links-module-AppModule-a667a1af0d89078971cba30b63396f74"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppServerModule.html" data-type="entity-link">AppServerModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppServerModule-0ecd476c86a51a7e74af89c7ebb326a4"' : 'data-target="#xs-components-links-module-AppServerModule-0ecd476c86a51a7e74af89c7ebb326a4"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppServerModule-0ecd476c86a51a7e74af89c7ebb326a4"' : 'id="xs-components-links-module-AppServerModule-0ecd476c86a51a7e74af89c7ebb326a4"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ContentTypesFrameModule.html" data-type="entity-link">ContentTypesFrameModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypesFrameModule-e794230420a07af56cf0723fdd77e9c9"' : 'data-target="#xs-components-links-module-ContentTypesFrameModule-e794230420a07af56cf0723fdd77e9c9"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypesFrameModule-e794230420a07af56cf0723fdd77e9c9"' : 'id="xs-components-links-module-ContentTypesFrameModule-e794230420a07af56cf0723fdd77e9c9"' }>
                                        <li class="link">
                                            <a href="components/ContentTypesFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypesFrameComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/EntitiesPageModule.html" data-type="entity-link">EntitiesPageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntitiesPageModule-bd702f1803b84f62c7fed7300fa21312"' : 'data-target="#xs-components-links-module-EntitiesPageModule-bd702f1803b84f62c7fed7300fa21312"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntitiesPageModule-bd702f1803b84f62c7fed7300fa21312"' : 'id="xs-components-links-module-EntitiesPageModule-bd702f1803b84f62c7fed7300fa21312"' }>
                                        <li class="link">
                                            <a href="components/EntitiesPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntitiesPageComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/GroupsFrameModule.html" data-type="entity-link">GroupsFrameModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupsFrameModule-5c441e35b175bbff91ca14326ad4447a"' : 'data-target="#xs-components-links-module-GroupsFrameModule-5c441e35b175bbff91ca14326ad4447a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupsFrameModule-5c441e35b175bbff91ca14326ad4447a"' : 'id="xs-components-links-module-GroupsFrameModule-5c441e35b175bbff91ca14326ad4447a"' }>
                                        <li class="link">
                                            <a href="components/GroupsFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupsFrameComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/HomePageModule.html" data-type="entity-link">HomePageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-HomePageModule-23a60d19fbcba6e3f7827d4a05844454"' : 'data-target="#xs-components-links-module-HomePageModule-23a60d19fbcba6e3f7827d4a05844454"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-HomePageModule-23a60d19fbcba6e3f7827d4a05844454"' : 'id="xs-components-links-module-HomePageModule-23a60d19fbcba6e3f7827d4a05844454"' }>
                                        <li class="link">
                                            <a href="components/HomePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PermissionsFrameModule.html" data-type="entity-link">PermissionsFrameModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionsFrameModule-c146ad2b9ebdadef400f4746d9be6d2b"' : 'data-target="#xs-components-links-module-PermissionsFrameModule-c146ad2b9ebdadef400f4746d9be6d2b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionsFrameModule-c146ad2b9ebdadef400f4746d9be6d2b"' : 'id="xs-components-links-module-PermissionsFrameModule-c146ad2b9ebdadef400f4746d9be6d2b"' }>
                                        <li class="link">
                                            <a href="components/PermissionsFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionsFrameComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ProfileFrameModule.html" data-type="entity-link">ProfileFrameModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ProfileFrameModule-f032d26284b33d17729a4cb6983262d3"' : 'data-target="#xs-components-links-module-ProfileFrameModule-f032d26284b33d17729a4cb6983262d3"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ProfileFrameModule-f032d26284b33d17729a4cb6983262d3"' : 'id="xs-components-links-module-ProfileFrameModule-f032d26284b33d17729a4cb6983262d3"' }>
                                        <li class="link">
                                            <a href="components/ProfileFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileFrameComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ThemesPageModule.html" data-type="entity-link">ThemesPageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ThemesPageModule-1cb57a1b74370ee3072a68e44f7f9046"' : 'data-target="#xs-components-links-module-ThemesPageModule-1cb57a1b74370ee3072a68e44f7f9046"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ThemesPageModule-1cb57a1b74370ee3072a68e44f7f9046"' : 'id="xs-components-links-module-ThemesPageModule-1cb57a1b74370ee3072a68e44f7f9046"' }>
                                        <li class="link">
                                            <a href="components/ThemesPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThemesPageComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UsersFrameModule.html" data-type="entity-link">UsersFrameModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-UsersFrameModule-030bcf5c2dfdf6555f2c4b77a7d478e5"' : 'data-target="#xs-components-links-module-UsersFrameModule-030bcf5c2dfdf6555f2c4b77a7d478e5"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UsersFrameModule-030bcf5c2dfdf6555f2c4b77a7d478e5"' : 'id="xs-components-links-module-UsersFrameModule-030bcf5c2dfdf6555f2c4b77a7d478e5"' }>
                                        <li class="link">
                                            <a href="components/UsersFrameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersFrameComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/CustomErrorHandler.html" data-type="entity-link">CustomErrorHandler</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
