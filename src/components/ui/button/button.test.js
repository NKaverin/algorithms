import renderer from 'react-test-renderer';
import {Button} from "./button";
import {render, screen, fireEvent} from '@testing-library/react'

describe('Тестирование компонента Button', () => {
    
    it('кнопка с текстом', () => {
        const button = renderer.create(<Button text='текстом' />).toJSON();
        expect(button).toMatchSnapshot();
    });

    it('кнопка без текста', () => {
        const button = renderer.create(<Button />).toJSON();
        expect(button).toMatchSnapshot();
    });

    it('заблокированная кнопки', () => {
        const button = renderer.create(<Button disabled={true} />).toJSON();
        expect(button).toMatchSnapshot();
    });

    it('кнопка с индикацией загрузки', () => {
        const button = renderer.create(<Button isLoader={true} />).toJSON();
        expect(button).toMatchSnapshot();
    });

    it('вызов колбека при клике на кнопку', () => {
        window.alert = jest.fn();
        render(<Button text='123' onClick={()=>{alert('колбека при клике на кнопку')}} />)
        const link = screen.getByText('123');
        fireEvent.click(link);
        expect(window.alert).toHaveBeenCalledWith('колбека при клике на кнопку');
    });
    
}) 