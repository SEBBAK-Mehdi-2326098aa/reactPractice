import './Main.css';
import todo from '/src/to-do-list.json'
import Header from '/src/components/Header/Header.js'
import Footer from '/src/components/Footer/Footer.js'
import Todos from '/src/components/Todos/Todos.js'

console.log(todo);

export default function Main() {
    return (
        <body>
            <Header></Header>
            <Todos></Todos>
            <Footer></Footer>
        </body>
    );
}
