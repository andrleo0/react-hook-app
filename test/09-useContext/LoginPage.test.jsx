import { fireEvent, render , screen } from "@testing-library/react";
import { LoginPage } from "../../src/09-useContext/LoginPage";
import { UserContext } from "../../src/09-useContext/context/UserContext";

describe('Prueba en <LoginPage />', () => { 
    
    test('debe de mostrar el componente sin el usuario', () => { 
        render(
            <UserContext.Provider value={{ user: null }}>
                <LoginPage />
            </UserContext.Provider>
        );

        const preTag = screen.getByLabelText('pre');
        expect( preTag.innerHTML ).toBe( 'null' );
    });

    test('debe de llamar el setUser cuando se hace click en el boton', () => { 

        const setUserMock = jest.fn();

        render(
            <UserContext.Provider value={{ user: null , setUser: setUserMock }}>
                <LoginPage />
            </UserContext.Provider>
        );

        const setButton = screen.getByRole('button');
        fireEvent.click( setButton );

        expect( setUserMock ).toHaveBeenCalledWith({ id:111 , name: 'Marianto' , email: 'mariantiño@gmail.com'});

        
    });

})
