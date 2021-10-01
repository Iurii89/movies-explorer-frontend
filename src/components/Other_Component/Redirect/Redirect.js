import { useHistory } from "react-router-dom";


function Redirect() {
    const history = useHistory();

    const goMovies = function () {history.push('/movies')}
    const goSavedMovies = function () {history.push('/saved-movies')};
    const goLanding = function () {history.push('/')};
    const goProfile = function () {history.push('/profile')};
    const goRegister = function () {history.push('/signup')};
    const goLogin = function () {history.push('/signin')};

    return {goMovies, goSavedMovies, goLanding, goProfile, goRegister, goLogin}
}

export default Redirect;