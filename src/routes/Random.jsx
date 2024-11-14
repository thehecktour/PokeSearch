import Pokemon from "../components/Pokemon";

export default function Random() {
  return (
    <>
      <div className="flex flex-row items-center justify-center mt-20">
        <Pokemon
          name="Pikachu"
          url="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
          ability="Static"
        />
        <Pokemon
          name="Charmander"
          url="https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png"
          ability="Blaze"
        />
        <Pokemon
          name="Squirtle"
          url="https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png"
          ability="Torrent"
        />
      </div>
    </>
  );
}
