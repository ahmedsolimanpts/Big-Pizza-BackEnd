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
                    <a href="index.html" data-type="index-link">big-pizza-back-end documentation</a>
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
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-95ea9a8f81237a3b9b70066a96a72bea7ad381ead36d53a4462a7dc62b9d6aa7ad74fe1a11db8ca11d5739e5d736bc7349ec0e4048ee6990d716f3097bac519f"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-95ea9a8f81237a3b9b70066a96a72bea7ad381ead36d53a4462a7dc62b9d6aa7ad74fe1a11db8ca11d5739e5d736bc7349ec0e4048ee6990d716f3097bac519f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-95ea9a8f81237a3b9b70066a96a72bea7ad381ead36d53a4462a7dc62b9d6aa7ad74fe1a11db8ca11d5739e5d736bc7349ec0e4048ee6990d716f3097bac519f"' :
                                            'id="xs-controllers-links-module-AuthModule-95ea9a8f81237a3b9b70066a96a72bea7ad381ead36d53a4462a7dc62b9d6aa7ad74fe1a11db8ca11d5739e5d736bc7349ec0e4048ee6990d716f3097bac519f"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/GoogleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-95ea9a8f81237a3b9b70066a96a72bea7ad381ead36d53a4462a7dc62b9d6aa7ad74fe1a11db8ca11d5739e5d736bc7349ec0e4048ee6990d716f3097bac519f"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-95ea9a8f81237a3b9b70066a96a72bea7ad381ead36d53a4462a7dc62b9d6aa7ad74fe1a11db8ca11d5739e5d736bc7349ec0e4048ee6990d716f3097bac519f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-95ea9a8f81237a3b9b70066a96a72bea7ad381ead36d53a4462a7dc62b9d6aa7ad74fe1a11db8ca11d5739e5d736bc7349ec0e4048ee6990d716f3097bac519f"' :
                                        'id="xs-injectables-links-module-AuthModule-95ea9a8f81237a3b9b70066a96a72bea7ad381ead36d53a4462a7dc62b9d6aa7ad74fe1a11db8ca11d5739e5d736bc7349ec0e4048ee6990d716f3097bac519f"' }>
                                        <li class="link">
                                            <a href="injectables/ATStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ATStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BillingModule.html" data-type="entity-link" >BillingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BillingModule-55dadb4e51f2acd099587efd9a95023bca74f06684dc0101542839251ff2c405fb0bca108a8a4d68cc4c1bc9ee87d6eae7ff6c2fad85c904da5ab59687f1b9fd"' : 'data-bs-target="#xs-controllers-links-module-BillingModule-55dadb4e51f2acd099587efd9a95023bca74f06684dc0101542839251ff2c405fb0bca108a8a4d68cc4c1bc9ee87d6eae7ff6c2fad85c904da5ab59687f1b9fd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BillingModule-55dadb4e51f2acd099587efd9a95023bca74f06684dc0101542839251ff2c405fb0bca108a8a4d68cc4c1bc9ee87d6eae7ff6c2fad85c904da5ab59687f1b9fd"' :
                                            'id="xs-controllers-links-module-BillingModule-55dadb4e51f2acd099587efd9a95023bca74f06684dc0101542839251ff2c405fb0bca108a8a4d68cc4c1bc9ee87d6eae7ff6c2fad85c904da5ab59687f1b9fd"' }>
                                            <li class="link">
                                                <a href="controllers/BillingController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BillingController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/SpendingAuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpendingAuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BillingModule-55dadb4e51f2acd099587efd9a95023bca74f06684dc0101542839251ff2c405fb0bca108a8a4d68cc4c1bc9ee87d6eae7ff6c2fad85c904da5ab59687f1b9fd"' : 'data-bs-target="#xs-injectables-links-module-BillingModule-55dadb4e51f2acd099587efd9a95023bca74f06684dc0101542839251ff2c405fb0bca108a8a4d68cc4c1bc9ee87d6eae7ff6c2fad85c904da5ab59687f1b9fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BillingModule-55dadb4e51f2acd099587efd9a95023bca74f06684dc0101542839251ff2c405fb0bca108a8a4d68cc4c1bc9ee87d6eae7ff6c2fad85c904da5ab59687f1b9fd"' :
                                        'id="xs-injectables-links-module-BillingModule-55dadb4e51f2acd099587efd9a95023bca74f06684dc0101542839251ff2c405fb0bca108a8a4d68cc4c1bc9ee87d6eae7ff6c2fad85c904da5ab59687f1b9fd"' }>
                                        <li class="link">
                                            <a href="injectables/BillingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BillingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InvoiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InvoiceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SpendingAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpendingAuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BranchModule.html" data-type="entity-link" >BranchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BranchModule-700ed2b2e014ccea72dd315f0aaa4394b82cd923dcddc2c44380f69fc5f64d80d1b0642dd3108a29a8df89c4aed210638147636e7d4dff7b6674dc89b8416e2c"' : 'data-bs-target="#xs-controllers-links-module-BranchModule-700ed2b2e014ccea72dd315f0aaa4394b82cd923dcddc2c44380f69fc5f64d80d1b0642dd3108a29a8df89c4aed210638147636e7d4dff7b6674dc89b8416e2c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BranchModule-700ed2b2e014ccea72dd315f0aaa4394b82cd923dcddc2c44380f69fc5f64d80d1b0642dd3108a29a8df89c4aed210638147636e7d4dff7b6674dc89b8416e2c"' :
                                            'id="xs-controllers-links-module-BranchModule-700ed2b2e014ccea72dd315f0aaa4394b82cd923dcddc2c44380f69fc5f64d80d1b0642dd3108a29a8df89c4aed210638147636e7d4dff7b6674dc89b8416e2c"' }>
                                            <li class="link">
                                                <a href="controllers/BranchController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BranchController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BranchModule-700ed2b2e014ccea72dd315f0aaa4394b82cd923dcddc2c44380f69fc5f64d80d1b0642dd3108a29a8df89c4aed210638147636e7d4dff7b6674dc89b8416e2c"' : 'data-bs-target="#xs-injectables-links-module-BranchModule-700ed2b2e014ccea72dd315f0aaa4394b82cd923dcddc2c44380f69fc5f64d80d1b0642dd3108a29a8df89c4aed210638147636e7d4dff7b6674dc89b8416e2c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BranchModule-700ed2b2e014ccea72dd315f0aaa4394b82cd923dcddc2c44380f69fc5f64d80d1b0642dd3108a29a8df89c4aed210638147636e7d4dff7b6674dc89b8416e2c"' :
                                        'id="xs-injectables-links-module-BranchModule-700ed2b2e014ccea72dd315f0aaa4394b82cd923dcddc2c44380f69fc5f64d80d1b0642dd3108a29a8df89c4aed210638147636e7d4dff7b6674dc89b8416e2c"' }>
                                        <li class="link">
                                            <a href="injectables/BranchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BranchService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CartModule.html" data-type="entity-link" >CartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' : 'data-bs-target="#xs-controllers-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' :
                                            'id="xs-controllers-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' }>
                                            <li class="link">
                                                <a href="controllers/CartController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' : 'data-bs-target="#xs-injectables-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' :
                                        'id="xs-injectables-links-module-CartModule-598dc4c2c0b17a51f4f9209f6b40c8246100fa69e76738d7621046c77e648f3d803cfe994ad2d6c0d049ed42d8d5f38a50da3a0422c87321e8fcc4df29ed6889"' }>
                                        <li class="link">
                                            <a href="injectables/CartService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CashierModule.html" data-type="entity-link" >CashierModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CashierModule-e7b1dff36bc0a5e808dc8c29839f925503933d7fa7dd3e5cfab80e1c5375d2faafcd6ecb06fa20ed9d9207406a4422b972547263b765aeb3309fae2c3a46ec96"' : 'data-bs-target="#xs-controllers-links-module-CashierModule-e7b1dff36bc0a5e808dc8c29839f925503933d7fa7dd3e5cfab80e1c5375d2faafcd6ecb06fa20ed9d9207406a4422b972547263b765aeb3309fae2c3a46ec96"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CashierModule-e7b1dff36bc0a5e808dc8c29839f925503933d7fa7dd3e5cfab80e1c5375d2faafcd6ecb06fa20ed9d9207406a4422b972547263b765aeb3309fae2c3a46ec96"' :
                                            'id="xs-controllers-links-module-CashierModule-e7b1dff36bc0a5e808dc8c29839f925503933d7fa7dd3e5cfab80e1c5375d2faafcd6ecb06fa20ed9d9207406a4422b972547263b765aeb3309fae2c3a46ec96"' }>
                                            <li class="link">
                                                <a href="controllers/CashierController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CashierController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CashierModule-e7b1dff36bc0a5e808dc8c29839f925503933d7fa7dd3e5cfab80e1c5375d2faafcd6ecb06fa20ed9d9207406a4422b972547263b765aeb3309fae2c3a46ec96"' : 'data-bs-target="#xs-injectables-links-module-CashierModule-e7b1dff36bc0a5e808dc8c29839f925503933d7fa7dd3e5cfab80e1c5375d2faafcd6ecb06fa20ed9d9207406a4422b972547263b765aeb3309fae2c3a46ec96"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CashierModule-e7b1dff36bc0a5e808dc8c29839f925503933d7fa7dd3e5cfab80e1c5375d2faafcd6ecb06fa20ed9d9207406a4422b972547263b765aeb3309fae2c3a46ec96"' :
                                        'id="xs-injectables-links-module-CashierModule-e7b1dff36bc0a5e808dc8c29839f925503933d7fa7dd3e5cfab80e1c5375d2faafcd6ecb06fa20ed9d9207406a4422b972547263b765aeb3309fae2c3a46ec96"' }>
                                        <li class="link">
                                            <a href="injectables/CashierService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CashierService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CouponModule.html" data-type="entity-link" >CouponModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CouponModule-525f25abcc13ca8ade1afa809ff43b350df687ee0fd549ee3949b2be41aa3504b5d015a59b7c7c16b3278d606c3ea38e35c7427749f811aff2c91e63530c2585"' : 'data-bs-target="#xs-controllers-links-module-CouponModule-525f25abcc13ca8ade1afa809ff43b350df687ee0fd549ee3949b2be41aa3504b5d015a59b7c7c16b3278d606c3ea38e35c7427749f811aff2c91e63530c2585"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CouponModule-525f25abcc13ca8ade1afa809ff43b350df687ee0fd549ee3949b2be41aa3504b5d015a59b7c7c16b3278d606c3ea38e35c7427749f811aff2c91e63530c2585"' :
                                            'id="xs-controllers-links-module-CouponModule-525f25abcc13ca8ade1afa809ff43b350df687ee0fd549ee3949b2be41aa3504b5d015a59b7c7c16b3278d606c3ea38e35c7427749f811aff2c91e63530c2585"' }>
                                            <li class="link">
                                                <a href="controllers/CouponController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CouponController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CouponModule-525f25abcc13ca8ade1afa809ff43b350df687ee0fd549ee3949b2be41aa3504b5d015a59b7c7c16b3278d606c3ea38e35c7427749f811aff2c91e63530c2585"' : 'data-bs-target="#xs-injectables-links-module-CouponModule-525f25abcc13ca8ade1afa809ff43b350df687ee0fd549ee3949b2be41aa3504b5d015a59b7c7c16b3278d606c3ea38e35c7427749f811aff2c91e63530c2585"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CouponModule-525f25abcc13ca8ade1afa809ff43b350df687ee0fd549ee3949b2be41aa3504b5d015a59b7c7c16b3278d606c3ea38e35c7427749f811aff2c91e63530c2585"' :
                                        'id="xs-injectables-links-module-CouponModule-525f25abcc13ca8ade1afa809ff43b350df687ee0fd549ee3949b2be41aa3504b5d015a59b7c7c16b3278d606c3ea38e35c7427749f811aff2c91e63530c2585"' }>
                                        <li class="link">
                                            <a href="injectables/CouponService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CouponService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CustomerModule.html" data-type="entity-link" >CustomerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CustomerModule-3807b410393286a2d31a9f941246527d29d729372e35a07ed7322303416f15735d1f8d2ab092625894d84792ec1eb39360824739ec5b534576692b6b5e8cc3e0"' : 'data-bs-target="#xs-controllers-links-module-CustomerModule-3807b410393286a2d31a9f941246527d29d729372e35a07ed7322303416f15735d1f8d2ab092625894d84792ec1eb39360824739ec5b534576692b6b5e8cc3e0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CustomerModule-3807b410393286a2d31a9f941246527d29d729372e35a07ed7322303416f15735d1f8d2ab092625894d84792ec1eb39360824739ec5b534576692b6b5e8cc3e0"' :
                                            'id="xs-controllers-links-module-CustomerModule-3807b410393286a2d31a9f941246527d29d729372e35a07ed7322303416f15735d1f8d2ab092625894d84792ec1eb39360824739ec5b534576692b6b5e8cc3e0"' }>
                                            <li class="link">
                                                <a href="controllers/CustomerAdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerAdminController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/CustomerLocationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerLocationsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/CustomerUserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerUserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CustomerModule-3807b410393286a2d31a9f941246527d29d729372e35a07ed7322303416f15735d1f8d2ab092625894d84792ec1eb39360824739ec5b534576692b6b5e8cc3e0"' : 'data-bs-target="#xs-injectables-links-module-CustomerModule-3807b410393286a2d31a9f941246527d29d729372e35a07ed7322303416f15735d1f8d2ab092625894d84792ec1eb39360824739ec5b534576692b6b5e8cc3e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CustomerModule-3807b410393286a2d31a9f941246527d29d729372e35a07ed7322303416f15735d1f8d2ab092625894d84792ec1eb39360824739ec5b534576692b6b5e8cc3e0"' :
                                        'id="xs-injectables-links-module-CustomerModule-3807b410393286a2d31a9f941246527d29d729372e35a07ed7322303416f15735d1f8d2ab092625894d84792ec1eb39360824739ec5b534576692b6b5e8cc3e0"' }>
                                        <li class="link">
                                            <a href="injectables/CustomerLocationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerLocationsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CustomerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeliveryModule.html" data-type="entity-link" >DeliveryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DeliveryModule-336cd72e93e390b1cb7ed968cadab43d175ad4667c4335edc540f5c6928ab158416c4599cb34714cd2fe49e8e532a7dbdb4d73839713766764d6e95693a8eeea"' : 'data-bs-target="#xs-controllers-links-module-DeliveryModule-336cd72e93e390b1cb7ed968cadab43d175ad4667c4335edc540f5c6928ab158416c4599cb34714cd2fe49e8e532a7dbdb4d73839713766764d6e95693a8eeea"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DeliveryModule-336cd72e93e390b1cb7ed968cadab43d175ad4667c4335edc540f5c6928ab158416c4599cb34714cd2fe49e8e532a7dbdb4d73839713766764d6e95693a8eeea"' :
                                            'id="xs-controllers-links-module-DeliveryModule-336cd72e93e390b1cb7ed968cadab43d175ad4667c4335edc540f5c6928ab158416c4599cb34714cd2fe49e8e532a7dbdb4d73839713766764d6e95693a8eeea"' }>
                                            <li class="link">
                                                <a href="controllers/DeliveryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DeliveryModule-336cd72e93e390b1cb7ed968cadab43d175ad4667c4335edc540f5c6928ab158416c4599cb34714cd2fe49e8e532a7dbdb4d73839713766764d6e95693a8eeea"' : 'data-bs-target="#xs-injectables-links-module-DeliveryModule-336cd72e93e390b1cb7ed968cadab43d175ad4667c4335edc540f5c6928ab158416c4599cb34714cd2fe49e8e532a7dbdb4d73839713766764d6e95693a8eeea"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DeliveryModule-336cd72e93e390b1cb7ed968cadab43d175ad4667c4335edc540f5c6928ab158416c4599cb34714cd2fe49e8e532a7dbdb4d73839713766764d6e95693a8eeea"' :
                                        'id="xs-injectables-links-module-DeliveryModule-336cd72e93e390b1cb7ed968cadab43d175ad4667c4335edc540f5c6928ab158416c4599cb34714cd2fe49e8e532a7dbdb4d73839713766764d6e95693a8eeea"' }>
                                        <li class="link">
                                            <a href="injectables/DeliveryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link" >EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmployeeModule-7868218c1c71af07e9aea50e35620267464f437bb24819cb91f84e0c96c21af6e29ebac94f582a53954951f1dd714ab9853dea89a1bccf22693169ee9d98263e"' : 'data-bs-target="#xs-controllers-links-module-EmployeeModule-7868218c1c71af07e9aea50e35620267464f437bb24819cb91f84e0c96c21af6e29ebac94f582a53954951f1dd714ab9853dea89a1bccf22693169ee9d98263e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmployeeModule-7868218c1c71af07e9aea50e35620267464f437bb24819cb91f84e0c96c21af6e29ebac94f582a53954951f1dd714ab9853dea89a1bccf22693169ee9d98263e"' :
                                            'id="xs-controllers-links-module-EmployeeModule-7868218c1c71af07e9aea50e35620267464f437bb24819cb91f84e0c96c21af6e29ebac94f582a53954951f1dd714ab9853dea89a1bccf22693169ee9d98263e"' }>
                                            <li class="link">
                                                <a href="controllers/AttendenceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttendenceController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/EmpPdrActionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmpPdrActionController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/EmployeeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PdrController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PdrController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmployeeModule-7868218c1c71af07e9aea50e35620267464f437bb24819cb91f84e0c96c21af6e29ebac94f582a53954951f1dd714ab9853dea89a1bccf22693169ee9d98263e"' : 'data-bs-target="#xs-injectables-links-module-EmployeeModule-7868218c1c71af07e9aea50e35620267464f437bb24819cb91f84e0c96c21af6e29ebac94f582a53954951f1dd714ab9853dea89a1bccf22693169ee9d98263e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeeModule-7868218c1c71af07e9aea50e35620267464f437bb24819cb91f84e0c96c21af6e29ebac94f582a53954951f1dd714ab9853dea89a1bccf22693169ee9d98263e"' :
                                        'id="xs-injectables-links-module-EmployeeModule-7868218c1c71af07e9aea50e35620267464f437bb24819cb91f84e0c96c21af6e29ebac94f582a53954951f1dd714ab9853dea89a1bccf22693169ee9d98263e"' }>
                                        <li class="link">
                                            <a href="injectables/AttendenceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AttendenceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmpPdrActionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmpPdrActionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmployeeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PdrService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PdrService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LocationModule.html" data-type="entity-link" >LocationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' : 'data-bs-target="#xs-controllers-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' :
                                            'id="xs-controllers-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' }>
                                            <li class="link">
                                                <a href="controllers/LocationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' : 'data-bs-target="#xs-injectables-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' :
                                        'id="xs-injectables-links-module-LocationModule-852410e56196aa9bdfcd7c068fbc71f6f7c7a3d424642db74ac615638f3072bc50f95bf09410d3ae02923952ea78d14fc94c634b94fce4e6442378da64296331"' }>
                                        <li class="link">
                                            <a href="injectables/LocationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-9866775f4a73fd79a3690586de79f06d51d321ad2118af1615c41dd386aef5411e74534c738f468d6b318a107bd6a6ca2f0f6f10095f2b518fdcef779a376327"' : 'data-bs-target="#xs-controllers-links-module-MailModule-9866775f4a73fd79a3690586de79f06d51d321ad2118af1615c41dd386aef5411e74534c738f468d6b318a107bd6a6ca2f0f6f10095f2b518fdcef779a376327"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-9866775f4a73fd79a3690586de79f06d51d321ad2118af1615c41dd386aef5411e74534c738f468d6b318a107bd6a6ca2f0f6f10095f2b518fdcef779a376327"' :
                                            'id="xs-controllers-links-module-MailModule-9866775f4a73fd79a3690586de79f06d51d321ad2118af1615c41dd386aef5411e74534c738f468d6b318a107bd6a6ca2f0f6f10095f2b518fdcef779a376327"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-9866775f4a73fd79a3690586de79f06d51d321ad2118af1615c41dd386aef5411e74534c738f468d6b318a107bd6a6ca2f0f6f10095f2b518fdcef779a376327"' : 'data-bs-target="#xs-injectables-links-module-MailModule-9866775f4a73fd79a3690586de79f06d51d321ad2118af1615c41dd386aef5411e74534c738f468d6b318a107bd6a6ca2f0f6f10095f2b518fdcef779a376327"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-9866775f4a73fd79a3690586de79f06d51d321ad2118af1615c41dd386aef5411e74534c738f468d6b318a107bd6a6ca2f0f6f10095f2b518fdcef779a376327"' :
                                        'id="xs-injectables-links-module-MailModule-9866775f4a73fd79a3690586de79f06d51d321ad2118af1615c41dd386aef5411e74534c738f468d6b318a107bd6a6ca2f0f6f10095f2b518fdcef779a376327"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' : 'data-bs-target="#xs-controllers-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' :
                                            'id="xs-controllers-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' }>
                                            <li class="link">
                                                <a href="controllers/MaterialController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MaterialController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' : 'data-bs-target="#xs-injectables-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' :
                                        'id="xs-injectables-links-module-MaterialModule-975ece2a423ec29a2f066b683e66e5796c2f92797fba4f30191df1874ef1e9be2c9e98614ca362a9bec16c60f4f9a200dca2ae13260aaf3063f9881acafdafd4"' }>
                                        <li class="link">
                                            <a href="injectables/MaterialService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MaterialService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationsModule.html" data-type="entity-link" >NotificationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NotificationsModule-58a24eb5bdb70be22195fd8eeca305b3b02f35af73144951a5396b1fb573af94eae39c582ae86349de33bf71dd42b9dfb4820a48b576168f2b3391b521b3f6f9"' : 'data-bs-target="#xs-controllers-links-module-NotificationsModule-58a24eb5bdb70be22195fd8eeca305b3b02f35af73144951a5396b1fb573af94eae39c582ae86349de33bf71dd42b9dfb4820a48b576168f2b3391b521b3f6f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NotificationsModule-58a24eb5bdb70be22195fd8eeca305b3b02f35af73144951a5396b1fb573af94eae39c582ae86349de33bf71dd42b9dfb4820a48b576168f2b3391b521b3f6f9"' :
                                            'id="xs-controllers-links-module-NotificationsModule-58a24eb5bdb70be22195fd8eeca305b3b02f35af73144951a5396b1fb573af94eae39c582ae86349de33bf71dd42b9dfb4820a48b576168f2b3391b521b3f6f9"' }>
                                            <li class="link">
                                                <a href="controllers/NotificationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NotificationsModule-58a24eb5bdb70be22195fd8eeca305b3b02f35af73144951a5396b1fb573af94eae39c582ae86349de33bf71dd42b9dfb4820a48b576168f2b3391b521b3f6f9"' : 'data-bs-target="#xs-injectables-links-module-NotificationsModule-58a24eb5bdb70be22195fd8eeca305b3b02f35af73144951a5396b1fb573af94eae39c582ae86349de33bf71dd42b9dfb4820a48b576168f2b3391b521b3f6f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotificationsModule-58a24eb5bdb70be22195fd8eeca305b3b02f35af73144951a5396b1fb573af94eae39c582ae86349de33bf71dd42b9dfb4820a48b576168f2b3391b521b3f6f9"' :
                                        'id="xs-injectables-links-module-NotificationsModule-58a24eb5bdb70be22195fd8eeca305b3b02f35af73144951a5396b1fb573af94eae39c582ae86349de33bf71dd42b9dfb4820a48b576168f2b3391b521b3f6f9"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OffersModule.html" data-type="entity-link" >OffersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OffersModule-21e22ae4f20f7f0b670ba7c21b059629cbb32123524c4bb0ac0cc2030e540deb6791141d27a5b40f4372cc868a9b988929dde7060ec722baa373fa23ced688a1"' : 'data-bs-target="#xs-controllers-links-module-OffersModule-21e22ae4f20f7f0b670ba7c21b059629cbb32123524c4bb0ac0cc2030e540deb6791141d27a5b40f4372cc868a9b988929dde7060ec722baa373fa23ced688a1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OffersModule-21e22ae4f20f7f0b670ba7c21b059629cbb32123524c4bb0ac0cc2030e540deb6791141d27a5b40f4372cc868a9b988929dde7060ec722baa373fa23ced688a1"' :
                                            'id="xs-controllers-links-module-OffersModule-21e22ae4f20f7f0b670ba7c21b059629cbb32123524c4bb0ac0cc2030e540deb6791141d27a5b40f4372cc868a9b988929dde7060ec722baa373fa23ced688a1"' }>
                                            <li class="link">
                                                <a href="controllers/OffersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OffersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OffersModule-21e22ae4f20f7f0b670ba7c21b059629cbb32123524c4bb0ac0cc2030e540deb6791141d27a5b40f4372cc868a9b988929dde7060ec722baa373fa23ced688a1"' : 'data-bs-target="#xs-injectables-links-module-OffersModule-21e22ae4f20f7f0b670ba7c21b059629cbb32123524c4bb0ac0cc2030e540deb6791141d27a5b40f4372cc868a9b988929dde7060ec722baa373fa23ced688a1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OffersModule-21e22ae4f20f7f0b670ba7c21b059629cbb32123524c4bb0ac0cc2030e540deb6791141d27a5b40f4372cc868a9b988929dde7060ec722baa373fa23ced688a1"' :
                                        'id="xs-injectables-links-module-OffersModule-21e22ae4f20f7f0b670ba7c21b059629cbb32123524c4bb0ac0cc2030e540deb6791141d27a5b40f4372cc868a9b988929dde7060ec722baa373fa23ced688a1"' }>
                                        <li class="link">
                                            <a href="injectables/OffersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OffersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrderModule.html" data-type="entity-link" >OrderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrderModule-636309859229b3b48c953dd2288cb6b3844cf2e3ac733e847cbf6c8683e282e223aefb0df2981e08db0be86bf7b2b2bbb4309f53fd26b6d1ed6e1e1144235f3d"' : 'data-bs-target="#xs-controllers-links-module-OrderModule-636309859229b3b48c953dd2288cb6b3844cf2e3ac733e847cbf6c8683e282e223aefb0df2981e08db0be86bf7b2b2bbb4309f53fd26b6d1ed6e1e1144235f3d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrderModule-636309859229b3b48c953dd2288cb6b3844cf2e3ac733e847cbf6c8683e282e223aefb0df2981e08db0be86bf7b2b2bbb4309f53fd26b6d1ed6e1e1144235f3d"' :
                                            'id="xs-controllers-links-module-OrderModule-636309859229b3b48c953dd2288cb6b3844cf2e3ac733e847cbf6c8683e282e223aefb0df2981e08db0be86bf7b2b2bbb4309f53fd26b6d1ed6e1e1144235f3d"' }>
                                            <li class="link">
                                                <a href="controllers/DeliveryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/DineInController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DineInController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/OnlineController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OnlineController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/OrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TakeAwayController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TakeAwayController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrderModule-636309859229b3b48c953dd2288cb6b3844cf2e3ac733e847cbf6c8683e282e223aefb0df2981e08db0be86bf7b2b2bbb4309f53fd26b6d1ed6e1e1144235f3d"' : 'data-bs-target="#xs-injectables-links-module-OrderModule-636309859229b3b48c953dd2288cb6b3844cf2e3ac733e847cbf6c8683e282e223aefb0df2981e08db0be86bf7b2b2bbb4309f53fd26b6d1ed6e1e1144235f3d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderModule-636309859229b3b48c953dd2288cb6b3844cf2e3ac733e847cbf6c8683e282e223aefb0df2981e08db0be86bf7b2b2bbb4309f53fd26b6d1ed6e1e1144235f3d"' :
                                        'id="xs-injectables-links-module-OrderModule-636309859229b3b48c953dd2288cb6b3844cf2e3ac733e847cbf6c8683e282e223aefb0df2981e08db0be86bf7b2b2bbb4309f53fd26b6d1ed6e1e1144235f3d"' }>
                                        <li class="link">
                                            <a href="injectables/DeliveryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DineInService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DineInService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OnlineService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OnlineService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OrderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TakeAwayService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TakeAwayService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentModule.html" data-type="entity-link" >PaymentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymentModule-a89c76e5256e6c704e5978240dbcd5464e5c20b05f15755d54cc11e7f273ce007976f275df86d93391667e2ecddf238baf9531061e186637995394eb216564aa"' : 'data-bs-target="#xs-controllers-links-module-PaymentModule-a89c76e5256e6c704e5978240dbcd5464e5c20b05f15755d54cc11e7f273ce007976f275df86d93391667e2ecddf238baf9531061e186637995394eb216564aa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentModule-a89c76e5256e6c704e5978240dbcd5464e5c20b05f15755d54cc11e7f273ce007976f275df86d93391667e2ecddf238baf9531061e186637995394eb216564aa"' :
                                            'id="xs-controllers-links-module-PaymentModule-a89c76e5256e6c704e5978240dbcd5464e5c20b05f15755d54cc11e7f273ce007976f275df86d93391667e2ecddf238baf9531061e186637995394eb216564aa"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentModule-a89c76e5256e6c704e5978240dbcd5464e5c20b05f15755d54cc11e7f273ce007976f275df86d93391667e2ecddf238baf9531061e186637995394eb216564aa"' : 'data-bs-target="#xs-injectables-links-module-PaymentModule-a89c76e5256e6c704e5978240dbcd5464e5c20b05f15755d54cc11e7f273ce007976f275df86d93391667e2ecddf238baf9531061e186637995394eb216564aa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentModule-a89c76e5256e6c704e5978240dbcd5464e5c20b05f15755d54cc11e7f273ce007976f275df86d93391667e2ecddf238baf9531061e186637995394eb216564aa"' :
                                        'id="xs-injectables-links-module-PaymentModule-a89c76e5256e6c704e5978240dbcd5464e5c20b05f15755d54cc11e7f273ce007976f275df86d93391667e2ecddf238baf9531061e186637995394eb216564aa"' }>
                                        <li class="link">
                                            <a href="injectables/CashService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CashService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaymentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaypalService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaypalService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaypalModule.html" data-type="entity-link" >PaypalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaypalModule-c94b12e36e03ced33011032693d9d5da24a579ca6bedacec7af32b5e1fedfeb18e3086778c5dfac4fe5543498f520e086a2d6ae39e7f0a3bd952bc436fb98a1c"' : 'data-bs-target="#xs-controllers-links-module-PaypalModule-c94b12e36e03ced33011032693d9d5da24a579ca6bedacec7af32b5e1fedfeb18e3086778c5dfac4fe5543498f520e086a2d6ae39e7f0a3bd952bc436fb98a1c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaypalModule-c94b12e36e03ced33011032693d9d5da24a579ca6bedacec7af32b5e1fedfeb18e3086778c5dfac4fe5543498f520e086a2d6ae39e7f0a3bd952bc436fb98a1c"' :
                                            'id="xs-controllers-links-module-PaypalModule-c94b12e36e03ced33011032693d9d5da24a579ca6bedacec7af32b5e1fedfeb18e3086778c5dfac4fe5543498f520e086a2d6ae39e7f0a3bd952bc436fb98a1c"' }>
                                            <li class="link">
                                                <a href="controllers/PaypalController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaypalController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaypalModule-c94b12e36e03ced33011032693d9d5da24a579ca6bedacec7af32b5e1fedfeb18e3086778c5dfac4fe5543498f520e086a2d6ae39e7f0a3bd952bc436fb98a1c"' : 'data-bs-target="#xs-injectables-links-module-PaypalModule-c94b12e36e03ced33011032693d9d5da24a579ca6bedacec7af32b5e1fedfeb18e3086778c5dfac4fe5543498f520e086a2d6ae39e7f0a3bd952bc436fb98a1c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaypalModule-c94b12e36e03ced33011032693d9d5da24a579ca6bedacec7af32b5e1fedfeb18e3086778c5dfac4fe5543498f520e086a2d6ae39e7f0a3bd952bc436fb98a1c"' :
                                        'id="xs-injectables-links-module-PaypalModule-c94b12e36e03ced33011032693d9d5da24a579ca6bedacec7af32b5e1fedfeb18e3086778c5dfac4fe5543498f520e086a2d6ae39e7f0a3bd952bc436fb98a1c"' }>
                                        <li class="link">
                                            <a href="injectables/PaypalService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaypalService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductModule-abbd9e79c01e853bb2a20ac76805c6ee1ee3ce9c617061791837bb82d28e00b924d8aa9b586c07e2f66e835d4f00ea0ca6dfedd2c5cabed6320e1413836bebc7"' : 'data-bs-target="#xs-controllers-links-module-ProductModule-abbd9e79c01e853bb2a20ac76805c6ee1ee3ce9c617061791837bb82d28e00b924d8aa9b586c07e2f66e835d4f00ea0ca6dfedd2c5cabed6320e1413836bebc7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-abbd9e79c01e853bb2a20ac76805c6ee1ee3ce9c617061791837bb82d28e00b924d8aa9b586c07e2f66e835d4f00ea0ca6dfedd2c5cabed6320e1413836bebc7"' :
                                            'id="xs-controllers-links-module-ProductModule-abbd9e79c01e853bb2a20ac76805c6ee1ee3ce9c617061791837bb82d28e00b924d8aa9b586c07e2f66e835d4f00ea0ca6dfedd2c5cabed6320e1413836bebc7"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductModule-abbd9e79c01e853bb2a20ac76805c6ee1ee3ce9c617061791837bb82d28e00b924d8aa9b586c07e2f66e835d4f00ea0ca6dfedd2c5cabed6320e1413836bebc7"' : 'data-bs-target="#xs-injectables-links-module-ProductModule-abbd9e79c01e853bb2a20ac76805c6ee1ee3ce9c617061791837bb82d28e00b924d8aa9b586c07e2f66e835d4f00ea0ca6dfedd2c5cabed6320e1413836bebc7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-abbd9e79c01e853bb2a20ac76805c6ee1ee3ce9c617061791837bb82d28e00b924d8aa9b586c07e2f66e835d4f00ea0ca6dfedd2c5cabed6320e1413836bebc7"' :
                                        'id="xs-injectables-links-module-ProductModule-abbd9e79c01e853bb2a20ac76805c6ee1ee3ce9c617061791837bb82d28e00b924d8aa9b586c07e2f66e835d4f00ea0ca6dfedd2c5cabed6320e1413836bebc7"' }>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StockModule.html" data-type="entity-link" >StockModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StockModule-624ba5ff46241e65ba5704409111f7ab5996e3dc2450982d9afcd4bb2e1b8f097e7d676e42d12133c32bb52542b2b08c0ee67f6a03c8778b2598c2a4daa2920f"' : 'data-bs-target="#xs-controllers-links-module-StockModule-624ba5ff46241e65ba5704409111f7ab5996e3dc2450982d9afcd4bb2e1b8f097e7d676e42d12133c32bb52542b2b08c0ee67f6a03c8778b2598c2a4daa2920f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StockModule-624ba5ff46241e65ba5704409111f7ab5996e3dc2450982d9afcd4bb2e1b8f097e7d676e42d12133c32bb52542b2b08c0ee67f6a03c8778b2598c2a4daa2920f"' :
                                            'id="xs-controllers-links-module-StockModule-624ba5ff46241e65ba5704409111f7ab5996e3dc2450982d9afcd4bb2e1b8f097e7d676e42d12133c32bb52542b2b08c0ee67f6a03c8778b2598c2a4daa2920f"' }>
                                            <li class="link">
                                                <a href="controllers/StockController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/StockGardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockGardController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/StockItemController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockItemController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/StockItemLogsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockItemLogsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/StockTransactionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockTransactionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StockModule-624ba5ff46241e65ba5704409111f7ab5996e3dc2450982d9afcd4bb2e1b8f097e7d676e42d12133c32bb52542b2b08c0ee67f6a03c8778b2598c2a4daa2920f"' : 'data-bs-target="#xs-injectables-links-module-StockModule-624ba5ff46241e65ba5704409111f7ab5996e3dc2450982d9afcd4bb2e1b8f097e7d676e42d12133c32bb52542b2b08c0ee67f6a03c8778b2598c2a4daa2920f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StockModule-624ba5ff46241e65ba5704409111f7ab5996e3dc2450982d9afcd4bb2e1b8f097e7d676e42d12133c32bb52542b2b08c0ee67f6a03c8778b2598c2a4daa2920f"' :
                                        'id="xs-injectables-links-module-StockModule-624ba5ff46241e65ba5704409111f7ab5996e3dc2450982d9afcd4bb2e1b8f097e7d676e42d12133c32bb52542b2b08c0ee67f6a03c8778b2598c2a4daa2920f"' }>
                                        <li class="link">
                                            <a href="injectables/StockGardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockGardService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StockItemLogsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockItemLogsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StockItemQuantityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockItemQuantityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StockItemService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockItemService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StockService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StockTransactionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockTransactionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SupplierModule.html" data-type="entity-link" >SupplierModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' : 'data-bs-target="#xs-controllers-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' :
                                            'id="xs-controllers-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' }>
                                            <li class="link">
                                                <a href="controllers/SupplierController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SupplierController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' : 'data-bs-target="#xs-injectables-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' :
                                        'id="xs-injectables-links-module-SupplierModule-fbd10f7927ce1d8297b9845654e68b00c0af927e0dd03a43a58a7e6255d3e428aaa27d9c8bbf9fd5be0427e55c1103044c0a2a8e61db1cfd793a246f6b27c72d"' }>
                                        <li class="link">
                                            <a href="injectables/SupplierService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SupplierService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TicketModule.html" data-type="entity-link" >TicketModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TicketModule-133e6709171c1675aaf559493a06e6060f9473915a63700d375283550c1ebd55023c6975a437733eca4598e5b6c4a9ba65212004b0beaa3049dcf9f848abd5e0"' : 'data-bs-target="#xs-controllers-links-module-TicketModule-133e6709171c1675aaf559493a06e6060f9473915a63700d375283550c1ebd55023c6975a437733eca4598e5b6c4a9ba65212004b0beaa3049dcf9f848abd5e0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TicketModule-133e6709171c1675aaf559493a06e6060f9473915a63700d375283550c1ebd55023c6975a437733eca4598e5b6c4a9ba65212004b0beaa3049dcf9f848abd5e0"' :
                                            'id="xs-controllers-links-module-TicketModule-133e6709171c1675aaf559493a06e6060f9473915a63700d375283550c1ebd55023c6975a437733eca4598e5b6c4a9ba65212004b0beaa3049dcf9f848abd5e0"' }>
                                            <li class="link">
                                                <a href="controllers/TicketController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TicketUpdatesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketUpdatesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TicketModule-133e6709171c1675aaf559493a06e6060f9473915a63700d375283550c1ebd55023c6975a437733eca4598e5b6c4a9ba65212004b0beaa3049dcf9f848abd5e0"' : 'data-bs-target="#xs-injectables-links-module-TicketModule-133e6709171c1675aaf559493a06e6060f9473915a63700d375283550c1ebd55023c6975a437733eca4598e5b6c4a9ba65212004b0beaa3049dcf9f848abd5e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TicketModule-133e6709171c1675aaf559493a06e6060f9473915a63700d375283550c1ebd55023c6975a437733eca4598e5b6c4a9ba65212004b0beaa3049dcf9f848abd5e0"' :
                                        'id="xs-injectables-links-module-TicketModule-133e6709171c1675aaf559493a06e6060f9473915a63700d375283550c1ebd55023c6975a437733eca4598e5b6c4a9ba65212004b0beaa3049dcf9f848abd5e0"' }>
                                        <li class="link">
                                            <a href="injectables/TicketService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TicketUpdatesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketUpdatesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-cdc90257d1b0a5f25bdd9d74e21786c99b4a1543f19bfcbd2c71b6199323f49e18cebaf8402bfa5ce460181d3745f23ead9f8ca0fa5e9e18d4e95fc20ca14a6c"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-cdc90257d1b0a5f25bdd9d74e21786c99b4a1543f19bfcbd2c71b6199323f49e18cebaf8402bfa5ce460181d3745f23ead9f8ca0fa5e9e18d4e95fc20ca14a6c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-cdc90257d1b0a5f25bdd9d74e21786c99b4a1543f19bfcbd2c71b6199323f49e18cebaf8402bfa5ce460181d3745f23ead9f8ca0fa5e9e18d4e95fc20ca14a6c"' :
                                            'id="xs-controllers-links-module-UsersModule-cdc90257d1b0a5f25bdd9d74e21786c99b4a1543f19bfcbd2c71b6199323f49e18cebaf8402bfa5ce460181d3745f23ead9f8ca0fa5e9e18d4e95fc20ca14a6c"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-cdc90257d1b0a5f25bdd9d74e21786c99b4a1543f19bfcbd2c71b6199323f49e18cebaf8402bfa5ce460181d3745f23ead9f8ca0fa5e9e18d4e95fc20ca14a6c"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-cdc90257d1b0a5f25bdd9d74e21786c99b4a1543f19bfcbd2c71b6199323f49e18cebaf8402bfa5ce460181d3745f23ead9f8ca0fa5e9e18d4e95fc20ca14a6c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-cdc90257d1b0a5f25bdd9d74e21786c99b4a1543f19bfcbd2c71b6199323f49e18cebaf8402bfa5ce460181d3745f23ead9f8ca0fa5e9e18d4e95fc20ca14a6c"' :
                                        'id="xs-injectables-links-module-UsersModule-cdc90257d1b0a5f25bdd9d74e21786c99b4a1543f19bfcbd2c71b6199323f49e18cebaf8402bfa5ce460181d3745f23ead9f8ca0fa5e9e18d4e95fc20ca14a6c"' }>
                                        <li class="link">
                                            <a href="injectables/ResetPasswordService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetPasswordService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VerifyEmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerifyEmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WalletModule.html" data-type="entity-link" >WalletModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-WalletModule-53589347cd4a5178ab52c71f81f52216d8d0c2eb62e9ce3cb009488879d09a39259e32f6e86461bb220cc3afda5b59ba6ad94498e236df5877642e3ccbe80b17"' : 'data-bs-target="#xs-controllers-links-module-WalletModule-53589347cd4a5178ab52c71f81f52216d8d0c2eb62e9ce3cb009488879d09a39259e32f6e86461bb220cc3afda5b59ba6ad94498e236df5877642e3ccbe80b17"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WalletModule-53589347cd4a5178ab52c71f81f52216d8d0c2eb62e9ce3cb009488879d09a39259e32f6e86461bb220cc3afda5b59ba6ad94498e236df5877642e3ccbe80b17"' :
                                            'id="xs-controllers-links-module-WalletModule-53589347cd4a5178ab52c71f81f52216d8d0c2eb62e9ce3cb009488879d09a39259e32f6e86461bb220cc3afda5b59ba6ad94498e236df5877642e3ccbe80b17"' }>
                                            <li class="link">
                                                <a href="controllers/WalletController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WalletController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-WalletModule-53589347cd4a5178ab52c71f81f52216d8d0c2eb62e9ce3cb009488879d09a39259e32f6e86461bb220cc3afda5b59ba6ad94498e236df5877642e3ccbe80b17"' : 'data-bs-target="#xs-injectables-links-module-WalletModule-53589347cd4a5178ab52c71f81f52216d8d0c2eb62e9ce3cb009488879d09a39259e32f6e86461bb220cc3afda5b59ba6ad94498e236df5877642e3ccbe80b17"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WalletModule-53589347cd4a5178ab52c71f81f52216d8d0c2eb62e9ce3cb009488879d09a39259e32f6e86461bb220cc3afda5b59ba6ad94498e236df5877642e3ccbe80b17"' :
                                        'id="xs-injectables-links-module-WalletModule-53589347cd4a5178ab52c71f81f52216d8d0c2eb62e9ce3cb009488879d09a39259e32f6e86461bb220cc3afda5b59ba6ad94498e236df5877642e3ccbe80b17"' }>
                                        <li class="link">
                                            <a href="injectables/WalletService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WalletService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AssignRoleDto.html" data-type="entity-link" >AssignRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Attendence.html" data-type="entity-link" >Attendence</a>
                            </li>
                            <li class="link">
                                <a href="classes/Billing.html" data-type="entity-link" >Billing</a>
                            </li>
                            <li class="link">
                                <a href="classes/Branch.html" data-type="entity-link" >Branch</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cart.html" data-type="entity-link" >Cart</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cashier.html" data-type="entity-link" >Cashier</a>
                            </li>
                            <li class="link">
                                <a href="classes/CashPayment.html" data-type="entity-link" >CashPayment</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeUserStatusDTO.html" data-type="entity-link" >ChangeUserStatusDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Coordinates.html" data-type="entity-link" >Coordinates</a>
                            </li>
                            <li class="link">
                                <a href="classes/CoordinatesInteface.html" data-type="entity-link" >CoordinatesInteface</a>
                            </li>
                            <li class="link">
                                <a href="classes/Coupon.html" data-type="entity-link" >Coupon</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAttendenceDTO.html" data-type="entity-link" >CreateAttendenceDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBaseOrderDto.html" data-type="entity-link" >CreateBaseOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBasePaymentDto.html" data-type="entity-link" >CreateBasePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBillingDto.html" data-type="entity-link" >CreateBillingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBranchDto.html" data-type="entity-link" >CreateBranchDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCartDto.html" data-type="entity-link" >CreateCartDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCashierDto.html" data-type="entity-link" >CreateCashierDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCordinatesDto.html" data-type="entity-link" >CreateCordinatesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCouponDto.html" data-type="entity-link" >CreateCouponDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCustomerDto.html" data-type="entity-link" >CreateCustomerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCustomerLocationDto.html" data-type="entity-link" >CreateCustomerLocationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDeliveryOrderDto.html" data-type="entity-link" >CreateDeliveryOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDineInOrderDto.html" data-type="entity-link" >CreateDineInOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmployeeDto.html" data-type="entity-link" >CreateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmployeeMonthlyPdrDTO.html" data-type="entity-link" >CreateEmployeeMonthlyPdrDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmployeePdrActionDto.html" data-type="entity-link" >CreateEmployeePdrActionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmployeeSpendingAuthDto.html" data-type="entity-link" >CreateEmployeeSpendingAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInvoiceSpendingAuthDto.html" data-type="entity-link" >CreateInvoiceSpendingAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLocationDto.html" data-type="entity-link" >CreateLocationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMaterialDto.html" data-type="entity-link" >CreateMaterialDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNotificationDto.html" data-type="entity-link" >CreateNotificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOfferDto.html" data-type="entity-link" >CreateOfferDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderItemsDto.html" data-type="entity-link" >CreateOrderItemsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSpendingAuthDto.html" data-type="entity-link" >CreateSpendingAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStockDto.html" data-type="entity-link" >CreateStockDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStockGardDto.html" data-type="entity-link" >CreateStockGardDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStockItemDto.html" data-type="entity-link" >CreateStockItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStockItemLogsDto.html" data-type="entity-link" >CreateStockItemLogsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateStockItemQuantityDto.html" data-type="entity-link" >CreateStockItemQuantityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSupplierDto.html" data-type="entity-link" >CreateSupplierDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTakeAwayOrderDto.html" data-type="entity-link" >CreateTakeAwayOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTicketDto.html" data-type="entity-link" >CreateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTicketUpdateDto.html" data-type="entity-link" >CreateTicketUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTransactionDto.html" data-type="entity-link" >CreateTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto-1.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateWalletDto.html" data-type="entity-link" >CreateWalletDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Customer.html" data-type="entity-link" >Customer</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomerLocations.html" data-type="entity-link" >CustomerLocations</a>
                            </li>
                            <li class="link">
                                <a href="classes/Delivery.html" data-type="entity-link" >Delivery</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeliveryOrder.html" data-type="entity-link" >DeliveryOrder</a>
                            </li>
                            <li class="link">
                                <a href="classes/DineinOrder.html" data-type="entity-link" >DineinOrder</a>
                            </li>
                            <li class="link">
                                <a href="classes/Employee.html" data-type="entity-link" >Employee</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmployeeMonthlyPDR.html" data-type="entity-link" >EmployeeMonthlyPDR</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmployeePDRAction.html" data-type="entity-link" >EmployeePDRAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmployeeSpendingAuthorization.html" data-type="entity-link" >EmployeeSpendingAuthorization</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmployeeTransactions.html" data-type="entity-link" >EmployeeTransactions</a>
                            </li>
                            <li class="link">
                                <a href="classes/Invoice.html" data-type="entity-link" >Invoice</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvoiceSpendingAuthorization.html" data-type="entity-link" >InvoiceSpendingAuthorization</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsEmployeeGuard.html" data-type="entity-link" >IsEmployeeGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsUserCustomerGuard.html" data-type="entity-link" >IsUserCustomerGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsWorkingInBranchGuard.html" data-type="entity-link" >IsWorkingInBranchGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/Location.html" data-type="entity-link" >Location</a>
                            </li>
                            <li class="link">
                                <a href="classes/Material.html" data-type="entity-link" >Material</a>
                            </li>
                            <li class="link">
                                <a href="classes/Notification.html" data-type="entity-link" >Notification</a>
                            </li>
                            <li class="link">
                                <a href="classes/Offer.html" data-type="entity-link" >Offer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Order.html" data-type="entity-link" >Order</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderItems.html" data-type="entity-link" >OrderItems</a>
                            </li>
                            <li class="link">
                                <a href="classes/Payment.html" data-type="entity-link" >Payment</a>
                            </li>
                            <li class="link">
                                <a href="classes/PayPalPayment.html" data-type="entity-link" >PayPalPayment</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPassword.html" data-type="entity-link" >ResetPassword</a>
                            </li>
                            <li class="link">
                                <a href="classes/RTGuard.html" data-type="entity-link" >RTGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInByEmailDto.html" data-type="entity-link" >SignInByEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpendingAuthorization.html" data-type="entity-link" >SpendingAuthorization</a>
                            </li>
                            <li class="link">
                                <a href="classes/Stock.html" data-type="entity-link" >Stock</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockGard.html" data-type="entity-link" >StockGard</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockItem.html" data-type="entity-link" >StockItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockItemQuantity.html" data-type="entity-link" >StockItemQuantity</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockItemslogs.html" data-type="entity-link" >StockItemslogs</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockTransaction.html" data-type="entity-link" >StockTransaction</a>
                            </li>
                            <li class="link">
                                <a href="classes/Supplier.html" data-type="entity-link" >Supplier</a>
                            </li>
                            <li class="link">
                                <a href="classes/TakeAwayOrder.html" data-type="entity-link" >TakeAwayOrder</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ticket.html" data-type="entity-link" >Ticket</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketUpdates.html" data-type="entity-link" >TicketUpdates</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenVerificationDto.html" data-type="entity-link" >TokenVerificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAttendenceDTO.html" data-type="entity-link" >UpdateAttendenceDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBillingDto.html" data-type="entity-link" >UpdateBillingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBranchDto.html" data-type="entity-link" >UpdateBranchDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCartDto.html" data-type="entity-link" >UpdateCartDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCashierDto.html" data-type="entity-link" >UpdateCashierDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCashPaymentDto.html" data-type="entity-link" >UpdateCashPaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCouponDto.html" data-type="entity-link" >UpdateCouponDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCustomerDto.html" data-type="entity-link" >UpdateCustomerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCustomerLocationDto.html" data-type="entity-link" >UpdateCustomerLocationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDeliveryOrderDto.html" data-type="entity-link" >UpdateDeliveryOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeeDto.html" data-type="entity-link" >UpdateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeeMonthlyPDRDTO.html" data-type="entity-link" >UpdateEmployeeMonthlyPDRDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeePdrActionDto.html" data-type="entity-link" >UpdateEmployeePdrActionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeeSpendingAuthDto.html" data-type="entity-link" >UpdateEmployeeSpendingAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInvoiceSpendingAuthDto.html" data-type="entity-link" >UpdateInvoiceSpendingAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLocationDto.html" data-type="entity-link" >UpdateLocationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMaterialDto.html" data-type="entity-link" >UpdateMaterialDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNotificationDto.html" data-type="entity-link" >UpdateNotificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOfferDto.html" data-type="entity-link" >UpdateOfferDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePaymentDto.html" data-type="entity-link" >UpdatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePayPalPaymentDto.html" data-type="entity-link" >UpdatePayPalPaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRefreshDto.html" data-type="entity-link" >UpdateRefreshDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSpendingAuthDto.html" data-type="entity-link" >UpdateSpendingAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStockDto.html" data-type="entity-link" >UpdateStockDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStockGardDto.html" data-type="entity-link" >UpdateStockGardDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStockItemDto.html" data-type="entity-link" >UpdateStockItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStockItemLogsDto.html" data-type="entity-link" >UpdateStockItemLogsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStockItemQuantityDto.html" data-type="entity-link" >UpdateStockItemQuantityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateStockTransactionDto.html" data-type="entity-link" >UpdateStockTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSupplierDto.html" data-type="entity-link" >UpdateSupplierDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTicketDto.html" data-type="entity-link" >UpdateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTicketUpdatesDto.html" data-type="entity-link" >UpdateTicketUpdatesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateWalletDto.html" data-type="entity-link" >UpdateWalletDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyUserEmail.html" data-type="entity-link" >VerifyUserEmail</a>
                            </li>
                            <li class="link">
                                <a href="classes/Wallet.html" data-type="entity-link" >Wallet</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ATGuard.html" data-type="entity-link" >ATGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JWTGuard.html" data-type="entity-link" >JWTGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AttendenceInterface.html" data-type="entity-link" >AttendenceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BranchInterface.html" data-type="entity-link" >BranchInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CouponInterface.html" data-type="entity-link" >CouponInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateBasePaymentInterface.html" data-type="entity-link" >CreateBasePaymentInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateCashPaymentInterface.html" data-type="entity-link" >CreateCashPaymentInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerInterface.html" data-type="entity-link" >CustomerInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerLocationsInterface.html" data-type="entity-link" >CustomerLocationsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeeInterface.html" data-type="entity-link" >EmployeeInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeeMonthlyPDRInterface.html" data-type="entity-link" >EmployeeMonthlyPDRInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeePDRActionInterface.html" data-type="entity-link" >EmployeePDRActionInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeeSpendingAuthInteface.html" data-type="entity-link" >EmployeeSpendingAuthInteface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeeTransactionInterface.html" data-type="entity-link" >EmployeeTransactionInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvoiceSpendingAuthInteface.html" data-type="entity-link" >InvoiceSpendingAuthInteface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Location.html" data-type="entity-link" >Location</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocationInterface.html" data-type="entity-link" >LocationInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OfferInterface.html" data-type="entity-link" >OfferInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderInterface.html" data-type="entity-link" >OrderInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderItemsInterface.html" data-type="entity-link" >OrderItemsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductInterface.html" data-type="entity-link" >ProductInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockGardInterface.html" data-type="entity-link" >StockGardInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockInterface.html" data-type="entity-link" >StockInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockItemInterface.html" data-type="entity-link" >StockItemInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockItemLogsInterface.html" data-type="entity-link" >StockItemLogsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockItemQuantityInterface.html" data-type="entity-link" >StockItemQuantityInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockTransactionInterface.html" data-type="entity-link" >StockTransactionInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SupplierInterface.html" data-type="entity-link" >SupplierInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketInterface.html" data-type="entity-link" >TicketInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketUpdatesInterface.html" data-type="entity-link" >TicketUpdatesInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Token.html" data-type="entity-link" >Token</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateBasePaymentInterface.html" data-type="entity-link" >UpdateBasePaymentInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateCashPaymentInterface.html" data-type="entity-link" >UpdateCashPaymentInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdatePayPalPaymentInterface.html" data-type="entity-link" >UpdatePayPalPaymentInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInterface.html" data-type="entity-link" >UserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerifyandGenerateRefreshToken.html" data-type="entity-link" >VerifyandGenerateRefreshToken</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});