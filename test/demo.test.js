
import { render, screen } from '@testing-library/react';
import { HooksApp } from '../src/HooksApp';



describe('Test de pruebas', () => {

    test('Prueba de igualdad', () => {
        expect(10).toBe(10);
    });

    test('Prueb de screenshoot de react', () => {
        
        render(<HooksApp />);
        
    });

});