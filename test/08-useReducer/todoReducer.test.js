import { todoReducer } from '../../src/08-useReducer/todoReducer';


describe('Pruebas en todoReducer', () => { 

    const inicialState = [{
        id: 1,
        description: 'Demo Todo',
        done: false
    }];
    
    test('debe de regresar el estado inicial', () => {

        const newState = todoReducer( inicialState , {} );
        expect( newState ).toBe( inicialState );

    });    

    test('debe de agregar un TODO', () => {
            
        const action = {
            type: '[TODO] Add Todo',
            payload: {
                id: 2,
                descripcion: 'Nuevo todo #2',
                done: false
            }
        };

        const newState = todoReducer( inicialState , action );
        expect( newState.length ).toBe( 2 );
        expect( newState ).toContain( action.payload );

    });

    test('debe de eliminar un Todo', () => {
            
        const action = {
            type: '[TODO] Remove Todo',
            payload: 1
        };

        const newState = todoReducer( inicialState , action );
        expect( newState.length ).toBe( 0 );

    });

    test('debe de realizar el Toggle del todo', () => {
            
        const action = {
            type: '[TODO] Toggle Todo',
            payload: 1
        };

        const newState = todoReducer( inicialState , action ); 
        expect( newState[0].done ).toBeTruthy();

        const newState2 = todoReducer( newState , action );
        expect( newState2[0].done ).toBeFalsy();

    });

})