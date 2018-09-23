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
            <a href="index.html" data-type="index-link">rucken:core</a>
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
                        <a href="modules/AccountModule.html" data-type="entity-link">AccountModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AccountModule-f83f6914189c49f8d4392cdadf8eba39"' : 'data-target="#xs-injectables-links-module-AccountModule-f83f6914189c49f8d4392cdadf8eba39"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AccountModule-f83f6914189c49f8d4392cdadf8eba39"' : 'id="xs-injectables-links-module-AccountModule-f83f6914189c49f8d4392cdadf8eba39"' }>
                                        <li class="link">
                                            <a href="injectables/AccountService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AccountService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AuthModule-ec0b3dbfa39a032d4164d09cf3226b92"' : 'data-target="#xs-components-links-module-AuthModule-ec0b3dbfa39a032d4164d09cf3226b92"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AuthModule-ec0b3dbfa39a032d4164d09cf3226b92"' : 'id="xs-components-links-module-AuthModule-ec0b3dbfa39a032d4164d09cf3226b92"' }>
                                        <li class="link">
                                            <a href="components/AuthEmptyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthEmptyComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AuthModule-ec0b3dbfa39a032d4164d09cf3226b92"' : 'data-target="#xs-injectables-links-module-AuthModule-ec0b3dbfa39a032d4164d09cf3226b92"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AuthModule-ec0b3dbfa39a032d4164d09cf3226b92"' : 'id="xs-injectables-links-module-AuthModule-ec0b3dbfa39a032d4164d09cf3226b92"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>TokenService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/LangModule.html" data-type="entity-link">LangModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-LangModule-9789ad31d9178879862921278bc92ccb"' : 'data-target="#xs-injectables-links-module-LangModule-9789ad31d9178879862921278bc92ccb"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-LangModule-9789ad31d9178879862921278bc92ccb"' : 'id="xs-injectables-links-module-LangModule-9789ad31d9178879862921278bc92ccb"' }>
                                        <li class="link">
                                            <a href="injectables/LangService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>LangService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TransferHttpCacheModule.html" data-type="entity-link">TransferHttpCacheModule</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/ContentType.html" data-type="entity-link">ContentType</a>
                    </li>
                    <li class="link">
                        <a href="classes/EqualsToOtherProperty.html" data-type="entity-link">EqualsToOtherProperty</a>
                    </li>
                    <li class="link">
                        <a href="classes/Group.html" data-type="entity-link">Group</a>
                    </li>
                    <li class="link">
                        <a href="classes/ILanguagesItem.html" data-type="entity-link">ILanguagesItem</a>
                    </li>
                    <li class="link">
                        <a href="classes/NotEqualsToPassword.html" data-type="entity-link">NotEqualsToPassword</a>
                    </li>
                    <li class="link">
                        <a href="classes/Permission.html" data-type="entity-link">Permission</a>
                    </li>
                    <li class="link">
                        <a href="classes/RedirectUriDto.html" data-type="entity-link">RedirectUriDto</a>
                    </li>
                    <li class="link">
                        <a href="classes/User.html" data-type="entity-link">User</a>
                    </li>
                    <li class="link">
                        <a href="classes/UserTokenDto.html" data-type="entity-link">UserTokenDto</a>
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
                                <a href="injectables/AccountService.html" data-type="entity-link">AccountService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/BrowserStorage.html" data-type="entity-link">BrowserStorage</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ErrorsExtractor.html" data-type="entity-link">ErrorsExtractor</a>
                            </li>
                            <li class="link">
                                <a href="injectables/LangService.html" data-type="entity-link">LangService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/PermissionsGuard.html" data-type="entity-link">PermissionsGuard</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TokenService.html" data-type="entity-link">TokenService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/UniversalStorage.html" data-type="entity-link">UniversalStorage</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"' }>
                <span class="icon ion-ios-swap"></span>
                <span>Interceptors</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                    <li class="link">
                        <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                    </li>
                    <li class="link">
                        <a href="interceptors/TransferHttpCacheInterceptor.html" data-type="entity-link">TransferHttpCacheInterceptor</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/OauthGuard.html" data-type="entity-link">OauthGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/IAccountConfig.html" data-type="entity-link">IAccountConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IAuthConfig.html" data-type="entity-link">IAuthConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IJwtConfig.html" data-type="entity-link">IJwtConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ILangConfig.html" data-type="entity-link">ILangConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IOauthConfig.html" data-type="entity-link">IOauthConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IStorage.html" data-type="entity-link">IStorage</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ITransferHttpResponse.html" data-type="entity-link">ITransferHttpResponse</a>
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
