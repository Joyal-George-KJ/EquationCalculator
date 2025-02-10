import { setValue } from "../utilities/slice/readingSlice";
import { useDispatch, useSelector } from "react-redux";

function useValue() {
    const dispatch = useDispatch(); // Correctly initialize dispatch
    const datas = useSelector((state) => state.calculateReading);

    const handleInputChange = (key, value, index) => {
        dispatch(setValue({ key, index, value })); // Dispatch the value to Redux
    };

    return [handleInputChange, datas];
}

export default useValue;
