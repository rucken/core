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
                                    ${ isNormalMode ? 'data-target="#components-links-module-AccountPageModule-c323cb1fe0e571527d0fa17d81e1d193"' : 'data-target="#xs-components-links-module-AccountPageModule-c323cb1fe0e571527d0fa17d81e1d193"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AccountPageModule-c323cb1fe0e571527d0fa17d81e1d193"' : 'id="xs-components-links-module-AccountPageModule-c323cb1fe0e571527d0fa17d81e1d193"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-AdminPageModule-c8e165c5b61854f0c72b35d22f5bc19e"' : 'data-target="#xs-components-links-module-AdminPageModule-c8e165c5b61854f0c72b35d22f5bc19e"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AdminPageModule-c8e165c5b61854f0c72b35d22f5bc19e"' : 'id="xs-components-links-module-AdminPageModule-c8e165c5b61854f0c72b35d22f5bc19e"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppBrowserModule-3636ae9dd9554eb5516880605419800f"' : 'data-target="#xs-components-links-module-AppBrowserModule-3636ae9dd9554eb5516880605419800f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppBrowserModule-3636ae9dd9554eb5516880605419800f"' : 'id="xs-components-links-module-AppBrowserModule-3636ae9dd9554eb5516880605419800f"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-d1d24ea5b3497f339138df445f8ec783"' : 'data-target="#xs-components-links-module-AppModule-d1d24ea5b3497f339138df445f8ec783"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-d1d24ea5b3497f339138df445f8ec783"' : 'id="xs-components-links-module-AppModule-d1d24ea5b3497f339138df445f8ec783"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppServerModule-4b4ef4d9112c4c1f8d2e560681f6b23a"' : 'data-target="#xs-components-links-module-AppServerModule-4b4ef4d9112c4c1f8d2e560681f6b23a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppServerModule-4b4ef4d9112c4c1f8d2e560681f6b23a"' : 'id="xs-components-links-module-AppServerModule-4b4ef4d9112c4c1f8d2e560681f6b23a"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentTypesFrameModule-30fb18f2d56204c58742aa6422c0b8a0"' : 'data-target="#xs-components-links-module-ContentTypesFrameModule-30fb18f2d56204c58742aa6422c0b8a0"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentTypesFrameModule-30fb18f2d56204c58742aa6422c0b8a0"' : 'id="xs-components-links-module-ContentTypesFrameModule-30fb18f2d56204c58742aa6422c0b8a0"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-EntitiesPageModule-d88342e2162615a6d68845b88d79e63e"' : 'data-target="#xs-components-links-module-EntitiesPageModule-d88342e2162615a6d68845b88d79e63e"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-EntitiesPageModule-d88342e2162615a6d68845b88d79e63e"' : 'id="xs-components-links-module-EntitiesPageModule-d88342e2162615a6d68845b88d79e63e"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-GroupsFrameModule-e2ab6e929f96de67f1460ae14ed70929"' : 'data-target="#xs-components-links-module-GroupsFrameModule-e2ab6e929f96de67f1460ae14ed70929"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GroupsFrameModule-e2ab6e929f96de67f1460ae14ed70929"' : 'id="xs-components-links-module-GroupsFrameModule-e2ab6e929f96de67f1460ae14ed70929"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-HomePageModule-970380cbcdec44e8dcfdf7491d2ccd55"' : 'data-target="#xs-components-links-module-HomePageModule-970380cbcdec44e8dcfdf7491d2ccd55"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-HomePageModule-970380cbcdec44e8dcfdf7491d2ccd55"' : 'id="xs-components-links-module-HomePageModule-970380cbcdec44e8dcfdf7491d2ccd55"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-PermissionsFrameModule-8ea56c9752c22046d027badbdc69ea4d"' : 'data-target="#xs-components-links-module-PermissionsFrameModule-8ea56c9752c22046d027badbdc69ea4d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PermissionsFrameModule-8ea56c9752c22046d027badbdc69ea4d"' : 'id="xs-components-links-module-PermissionsFrameModule-8ea56c9752c22046d027badbdc69ea4d"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-ProfileFrameModule-f091cf40ef568d8be68ff967c66cc007"' : 'data-target="#xs-components-links-module-ProfileFrameModule-f091cf40ef568d8be68ff967c66cc007"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ProfileFrameModule-f091cf40ef568d8be68ff967c66cc007"' : 'id="xs-components-links-module-ProfileFrameModule-f091cf40ef568d8be68ff967c66cc007"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-ThemesPageModule-7a8aaf4c93892bf6b60503e4a3b56ecb"' : 'data-target="#xs-components-links-module-ThemesPageModule-7a8aaf4c93892bf6b60503e4a3b56ecb"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ThemesPageModule-7a8aaf4c93892bf6b60503e4a3b56ecb"' : 'id="xs-components-links-module-ThemesPageModule-7a8aaf4c93892bf6b60503e4a3b56ecb"' }>
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
                                    ${ isNormalMode ? 'data-target="#components-links-module-UsersFrameModule-f1fa90c669b3f4ff954ef02c7ad623e8"' : 'data-target="#xs-components-links-module-UsersFrameModule-f1fa90c669b3f4ff954ef02c7ad623e8"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UsersFrameModule-f1fa90c669b3f4ff954ef02c7ad623e8"' : 'id="xs-components-links-module-UsersFrameModule-f1fa90c669b3f4ff954ef02c7ad623e8"' }>
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
