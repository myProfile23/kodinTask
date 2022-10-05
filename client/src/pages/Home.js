import Login from '../components/user/Login';
import Board from '../pages/board/Board';
import { useValue } from '../context/ContextProvider';
import Notification from '../components/Notification';
import Loading from '../components/Loading';

const Home = () => {
  const {
    state: { currentUser },
  } = useValue();
  return (
    <>
      <Loading />
      <Notification />
      {!currentUser ? (<Login />) : (<Board />)}
    </>
  );
};

export default Home;
