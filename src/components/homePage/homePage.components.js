import { useState, useEffect } from "react";
import { db } from "../../utils/firebase/firebase.utils";
import { 
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc
} from "firebase/firestore";

const HomePage = () => {
    const [newName, setNewName] = useState('');
    const [newLevel, setNewLevel] = useState('')
    const [newType, setNewType] = useState('');

    const [pokemons, setPokemons] = useState([]);
    const pokemonsCollectionRef = collection(db, 'pokemons');

    const createPokemon = async () => {
        await addDoc(pokemonsCollectionRef, { name: newName, level: Number(newLevel), type: newType })
        window.location.reload(false)
    };

    const updatePokemon = async (id, level) => {
        const pokemonDoc = doc(db, "pokemons", id);
        const newField = { level: level + 1 };
        await updateDoc(pokemonDoc, newField)
        window.location.reload(false)
    }

    const deletePokemon = async (id) => {
        const pokemonDoc = doc(db, 'pokemons', id);
        await deleteDoc(pokemonDoc)
        window.location.reload(false)
    }

    useEffect(() => {
        const getPokemons = async () => {
            const data = await getDocs(pokemonsCollectionRef);
            setPokemons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getPokemons();
    }, []);

    return (
        <div>
            <input
                placeholder="Name"
                onChange={(event) => {
                    setNewName(event.target.value);
                }}
            />
            <input
                type="number"
                placeholder="Level"
                onChange={(event) => {
                    setNewLevel(event.target.value);
                }}
            />
            <select 
                value={setNewType}
                onChange={(event) => {
                    setNewType(event.target.value)
                }}
            >
                <option>Select a type</option>
                <option value='Normal' >Normal</option>
                <option value='Fire' >Fire</option>
                <option value='Water' >Water</option>
                <option value='Grass' >Grass</option>
                <option value='Rock' >Rock</option>
                <option value='Electric' >Electric</option>
                <option value='Dark' >Dark</option>
            </select>
            <button onClick={createPokemon}>Add</button>
            <h1>Pokemons</h1>
            { pokemons.map((pokemon) => {
                return (
                    <div>
                        <h2>Name: {pokemon.name}</h2>
                        <h2>Level: {pokemon.level}</h2>
                        <h2>Type: {pokemon.type}</h2>
                        <button
                            onClick={() => {
                                updatePokemon(pokemon.id, pokemon.level)
                            }}
                        >
                            Increase Level
                        </button>
                        <button onClick={() => {
                            deletePokemon(pokemon.id)
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )
            })}
        </div>
    )
};

export default HomePage;