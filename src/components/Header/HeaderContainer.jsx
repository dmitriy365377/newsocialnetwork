import React from 'react';
import Header from "./Header";
import * as axios from "axios";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/auth-reducer";
import { authAPI } from '../../api/api';

class HeaderContainer extends React.Component {
    componentDidMount() {
        authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let { id, login, email } = response.data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            });
    }

    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);