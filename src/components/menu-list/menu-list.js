import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded} from '../../actions';

import './menu-list.scss';

class MenuList extends Component {
    componentDidMount() {
        const {RestoService} = this.props;
        RestoService.getMenuItems()
        .then(res => this.props.menuLoaded(res));
    }

    render() {
        const {menuItems} = this.props;

        return (
            <ul className="menu__list">
                {
                    menuItems.map(menuItem => {
                        return <MenuListItem key={menuItems.id} menuItem={menuItem}/>
                    })
                }
            </ul>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu
    }
}

const mapDispatchToProps = {
    menuLoaded
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         menuLoaded: (newMenu) => {
//             dispatch(menuLoaded(newMenu))
//         }
//     }
// }


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));