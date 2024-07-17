import { fireEvent, render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from "../../src/03-examples";
import { useFetch } from "../../src/hooks/useFetch";
import { useCounter } from "../../src/hooks/useCounter";

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

const bulbasaurData =  {
    name:'bulbasaur',
    sprites:{
        front_default:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        front_shiny:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
        back_default:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        back_shiny:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png'
    }         
}

describe('Pruebas en el <MultipleCustomHooks />', () => {

    const mockCounter = 1;
    const mockIncrement = jest.fn();
    const mockDecrement = jest.fn();

    useCounter.mockReturnValue({
        counter: mockCounter,
        decrement: mockDecrement,
        increment: mockIncrement
    });

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test('debe de mostrar el componente por defecto', () => { 

        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null,
        });

        render( <MultipleCustomHooks />);

        expect( screen.getByText('Loading...'));
        expect( screen.queryByText('Informacion de Pokemon'));

        const buttonSiguiente = screen.getByRole('button',{ name: 'Siguiente'});
        expect( buttonSiguiente.disabled ).toBeFalsy();

    });
    
    test('debe de mostrar el nombre e imagenes del pokemon', () => {

        useFetch.mockReturnValue({
            data: bulbasaurData,
            isLoading: false,
            hasError: null,
        });

        render( <MultipleCustomHooks />);

        expect( screen.getByText(`#${mockCounter} - ${bulbasaurData.name}`) );
        const spriteImages = screen.getAllByRole('img');
        spriteImages.forEach( (img, index) => {
            expect( img.src ).toBe( bulbasaurData.sprites[Object.keys(bulbasaurData.sprites)[index]]);
        });

    });

    test('debe de llamar la funcion de incrementar', () => {    
    
        useFetch.mockReturnValue({
            data: bulbasaurData,
            isLoading: false,
            hasError: null,
        });

        render( <MultipleCustomHooks />);

        const buttonSiguiente = screen.getByRole('button',{ name: 'Siguiente'});
        fireEvent.click( buttonSiguiente );

        expect( mockIncrement ).toHaveBeenCalled();

    });
});
