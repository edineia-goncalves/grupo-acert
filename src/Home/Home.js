import React, { Fragment } from 'react';
import NavBar from './NavBar';
import Artists from './Artists';
import Albums from './Albums';
import MySearch from './MySearch';
import TabsAcert from '../components/Tabs';

class Home extends React.Component {
    render() {
        return <Fragment>
            <NavBar></NavBar>
            <TabsAcert
                firstLabel="Artistas"
                secondLabel="Álbuns"
                thirdLabel="Minhas pesquisas"
                firstContent={<Artists></Artists>}
                secondContent={<Albums></Albums>}
                thirdContent={<MySearch></MySearch>}>
            </TabsAcert>
        </Fragment>
    }
}

export default Home;