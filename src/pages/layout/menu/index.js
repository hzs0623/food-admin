import { Menu } from 'antd';
import { menuConfig } from '../../../router/routers'

import widthUseNavigate from '../../../utils/widthUseNavigate'

const App = (props) => {
    const onClick = (e) => {
        props.to(e.key);
    };
    return (
        <>
            <Menu
                theme='dark'
                onClick={onClick}
                mode="inline"
                items={menuConfig}
            />
        </>
    );
};
export default widthUseNavigate(App);