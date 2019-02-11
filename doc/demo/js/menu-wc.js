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
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">rucken:demo</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
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
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountPageModule.html" data-type="entity-link">AccountPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AccountPageModule-bc1d4f9a22c547910357664088f96a99"' : 'data-target="#xs-components-links-module-AccountPageModule-bc1d4f9a22c547910357664088f96a99"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountPageModule-bc1d4f9a22c547910357664088f96a99"' :
                                            'id="xs-components-links-module-AccountPageModule-bc1d4f9a22c547910357664088f96a99"' }>
                                            <li class="link">
                                                <a href="components/AccountPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPageModule.html" data-type="entity-link">AdminPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminPageModule-b04139fd1fcdd95043d71f88e31a8098"' : 'data-target="#xs-components-links-module-AdminPageModule-b04139fd1fcdd95043d71f88e31a8098"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminPageModule-b04139fd1fcdd95043d71f88e31a8098"' :
                                            'id="xs-components-links-module-AdminPageModule-b04139fd1fcdd95043d71f88e31a8098"' }>
                                            <li class="link">
                                                <a href="components/AdminPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppBrowserModule.html" data-type="entity-link">AppBrowserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppBrowserModule-76850b4a5f2818a3148bd80cc146aa74"' : 'data-target="#xs-components-links-module-AppBrowserModule-76850b4a5f2818a3148bd80cc146aa74"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppBrowserModule-76850b4a5f2818a3148bd80cc146aa74"' :
                                            'id="xs-components-links-module-AppBrowserModule-76850b4a5f2818a3148bd80cc146aa74"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-98ccd6a0946c656c6924b85282e06b3c"' : 'data-target="#xs-components-links-module-AppModule-98ccd6a0946c656c6924b85282e06b3c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-98ccd6a0946c656c6924b85282e06b3c"' :
                                            'id="xs-components-links-module-AppModule-98ccd6a0946c656c6924b85282e06b3c"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppServerModule.html" data-type="entity-link">AppServerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppServerModule-352bdea85746920eda7e9dacc8960d68"' : 'data-target="#xs-components-links-module-AppServerModule-352bdea85746920eda7e9dacc8960d68"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppServerModule-352bdea85746920eda7e9dacc8960d68"' :
                                            'id="xs-components-links-module-AppServerModule-352bdea85746920eda7e9dacc8960d68"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContentTypesFrameModule.html" data-type="entity-link">ContentTypesFrameModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContentTypesFrameModule-9e28107ddac3c3963502c091bf33e6e2"' : 'data-target="#xs-components-links-module-ContentTypesFrameModule-9e28107ddac3c3963502c091bf33e6e2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentTypesFrameModule-9e28107ddac3c3963502c091bf33e6e2"' :
                                            'id="xs-components-links-module-ContentTypesFrameModule-9e28107ddac3c3963502c091bf33e6e2"' }>
                                            <li class="link">
                                                <a href="components/ContentTypesFrameComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentTypesFrameComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EntitiesPageModule.html" data-type="entity-link">EntitiesPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EntitiesPageModule-0336071dcf3a1cb2de23a81184b1bfbd"' : 'data-target="#xs-components-links-module-EntitiesPageModule-0336071dcf3a1cb2de23a81184b1bfbd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EntitiesPageModule-0336071dcf3a1cb2de23a81184b1bfbd"' :
                                            'id="xs-components-links-module-EntitiesPageModule-0336071dcf3a1cb2de23a81184b1bfbd"' }>
                                            <li class="link">
                                                <a href="components/EntitiesPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntitiesPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroupsFrameModule.html" data-type="entity-link">GroupsFrameModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GroupsFrameModule-bbc11cab8e8e89cb28a55019a179ce6d"' : 'data-target="#xs-components-links-module-GroupsFrameModule-bbc11cab8e8e89cb28a55019a179ce6d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroupsFrameModule-bbc11cab8e8e89cb28a55019a179ce6d"' :
                                            'id="xs-components-links-module-GroupsFrameModule-bbc11cab8e8e89cb28a55019a179ce6d"' }>
                                            <li class="link">
                                                <a href="components/GroupsFrameComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupsFrameComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link">HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-1395be210495ccbc1fe857a0126eb5ee"' : 'data-target="#xs-components-links-module-HomePageModule-1395be210495ccbc1fe857a0126eb5ee"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-1395be210495ccbc1fe857a0126eb5ee"' :
                                            'id="xs-components-links-module-HomePageModule-1395be210495ccbc1fe857a0126eb5ee"' }>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsFrameModule.html" data-type="entity-link">PermissionsFrameModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PermissionsFrameModule-9d81cf0d12461dbbce30c33269327c89"' : 'data-target="#xs-components-links-module-PermissionsFrameModule-9d81cf0d12461dbbce30c33269327c89"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PermissionsFrameModule-9d81cf0d12461dbbce30c33269327c89"' :
                                            'id="xs-components-links-module-PermissionsFrameModule-9d81cf0d12461dbbce30c33269327c89"' }>
                                            <li class="link">
                                                <a href="components/PermissionsFrameComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PermissionsFrameComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileFrameModule.html" data-type="entity-link">ProfileFrameModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfileFrameModule-4c8ef289069bd12416c6d52d385fe053"' : 'data-target="#xs-components-links-module-ProfileFrameModule-4c8ef289069bd12416c6d52d385fe053"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileFrameModule-4c8ef289069bd12416c6d52d385fe053"' :
                                            'id="xs-components-links-module-ProfileFrameModule-4c8ef289069bd12416c6d52d385fe053"' }>
                                            <li class="link">
                                                <a href="components/ProfileFrameComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileFrameComponent</a>
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
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ThemesPageModule-4937d084e3e031529422534743499415"' : 'data-target="#xs-components-links-module-ThemesPageModule-4937d084e3e031529422534743499415"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ThemesPageModule-4937d084e3e031529422534743499415"' :
                                            'id="xs-components-links-module-ThemesPageModule-4937d084e3e031529422534743499415"' }>
                                            <li class="link">
                                                <a href="components/ThemesPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThemesPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersFrameModule.html" data-type="entity-link">UsersFrameModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersFrameModule-2780e0a39e33cb986e557eb9200393d0"' : 'data-target="#xs-components-links-module-UsersFrameModule-2780e0a39e33cb986e557eb9200393d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersFrameModule-2780e0a39e33cb986e557eb9200393d0"' :
                                            'id="xs-components-links-module-UsersFrameModule-2780e0a39e33cb986e557eb9200393d0"' }>
                                            <li class="link">
                                                <a href="components/UsersFrameComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersFrameComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CustomErrorHandler.html" data-type="entity-link">CustomErrorHandler</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ICoreConfig.html" data-type="entity-link">ICoreConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEnvironment.html" data-type="entity-link">IEnvironment</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
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
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});