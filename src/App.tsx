import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/styles.scss';
import { TicTacToeGame, NavigationBar } from './Components';

function App() {
    return (
        <div className="App">
            <NavigationBar Title='TIC-TAC-TOE'/>
            <main>
                <TicTacToeGame />
            </main>
        </div>
    );
}

export default App;
