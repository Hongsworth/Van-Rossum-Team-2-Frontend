export const getMenu = () => {
    return `<ul class="menu">
            <li><a href="/index.html" class="menu__item">Home</a></li>
            <li><a href="/pages/grid/grid.html" class="menu__item">Feed</a></li>
            <li><a href="#"
                    class="menu__item menu__item--loggedOut">Login/Register</a>
            </li>
            <li><a href="#" class="menu__item menu__item--loggedIn">Add a
                    Post</a></li>
            <li><a href="/pages/user-profile/user-profile.html" class="menu__item">Profile</a>
            </li>
            <li><a href="#" class="menu__item menu__item--loggedIn">Logout</a>
            </li>
        </ul>
        <button class="hamburger">
            <i class="hamburger__menu-icon material-icons">menu</i>
            <i class="hamburger__close-icon material-icons">close</i>
        </button>
`;
};
