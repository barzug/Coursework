'use strict';

function requireAll(r) { r.keys().forEach(r); }

requireAll(require.context('./views/', true, /\.(css)$/));
requireAll(require.context('../public/', true, /\.(css)$/));

import Router from './modules/router';

import AuthUserView from './views/userblockview/auth/authview';
import UnauthUserView from './views/userblockview/unauth/unauthview';

import ApplicationView from './views/applicationview/applicationview';
import MainPage from './views/mainpageview/mainpage';
import SigninView from './views/formsview/signinview/signinview';
import SignupView from './views/formsview/signupview/signupview';
import NotFoundView from './views/notfoundview/notfoundview';
import ForumCreateView from './views/forumcreateview/forumcreateview'

import UserService from './services/user-service';

const userService = new UserService();


const root = new ApplicationView(document.getElementById("root"));
root.create();

const mainBlock = root.getMainBlock();
const topBar = root.getTopBar();

const authUserView = new AuthUserView(topBar);
const unauthUserView = new UnauthUserView(topBar);

const mainPageView = new MainPage(mainBlock);
const notFoundView = new NotFoundView(mainBlock);
const signinView = new SigninView(mainBlock);
const signupView = new SignupView(mainBlock);
const forumCreateView = new ForumCreateView(mainBlock)

const router = new Router();

router.setNotFoundPage(notFoundView);

router.register('/', mainPageView)
    .register('/signin', signinView)
    .register('/signup', signupView)
    .register('/create', forumCreateView)
    .start();


userService.getData()
    .then(() => authUserView.create())
    .catch(() => unauthUserView.create());
