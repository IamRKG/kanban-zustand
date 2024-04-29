import { useStore } from "zustand"
import {shallow} from "zustand/shallow"

const Temp = ()=>{
    const taskes = useStore(
        (store) => store.taskes.filter((task) => task.state === state),
        shallow
    )
}