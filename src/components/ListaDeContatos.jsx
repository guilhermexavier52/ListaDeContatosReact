import { useState } from 'react';
import '../components/ListaDeContatos.css';

function ListaDeContatos() {
    const [contatos, setContatos] = useState([]);
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const formatarTelefone = (telefone) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    };

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const adicionarContato = () => {
        if (nome.trim() && telefone.trim() && email.trim()) {
            if (!validarEmail(email)) {
                setError('Por favor, insira um e-mail válido.');
                return;
            }
            const novoContato = {
                id: Date.now(),
                nome,
                telefone: formatarTelefone(telefone),
                email
            };
            setContatos([...contatos, novoContato]);
            setNome('');
            setTelefone('');
            setEmail('');
            setError('');
        } else {
            setError('Por favor, preencha todos os campos.');
        }
    };

    const removerContato = (id) => {
        setContatos(contatos.filter((contato) => contato.id !== id));
    };

    return (
        <div className="container">
            <h2>Lista de Contatos</h2>
            <div className="form-group">
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                />
                <input
                    type="text"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Telefone"
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                />
                <button onClick={adicionarContato}>Adicionar Contato</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <ul>
                {contatos.map((contato) => (
                    <li key={contato.id}>
                        <strong>{contato.nome}</strong>: {contato.telefone} | {contato.email}
                        <button onClick={() => removerContato(contato.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaDeContatos;
