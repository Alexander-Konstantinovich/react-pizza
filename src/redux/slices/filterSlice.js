import { createSlice } from '@reduxjs/toolkit' //импорт библиотеки, которая содержит в себе возможность создавать Slice

const initialState = {
  count: 0,
}

export const counterSlice = createSlice({  //Создаёт новый Slice в counterSlice
  name: 'counter', //Название Slice
  initialState: initialState, //Первое состояние нашего Slice

  reducers: { //Содержит всю логику (методы) для работы с нашим состоянием.(обрабатывает наш state)
    increment: (state) => {		//для дальнейшего использования методов, необходимо их экспортировать
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
    },
  },
})


export const { increment, decrement, incrementByAmount } = counterSlice.actions // Вытаскиваем из нашего объекта counterSlice все действия(методы)

export default counterSlice.reducer  //Экспортируем в наш store(хранилище)