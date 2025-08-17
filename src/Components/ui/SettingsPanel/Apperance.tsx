import { useDispatch } from "react-redux";
import { updateColor } from "../../../rdk/reactFlowSlice";
import type { AppDispatch } from "@/rdk/Store"

const colors = ["#D1FFC6", "#D6D4A0", "#D3C0CD", "#B9CDDA", "#A6D8D4", ];

type SelectedNodeProps = {
    selectedNode : {
    id : string,
    color : string,
    label : string,
    content? : string | number
    }
}

const Apperance = ( {selectedNode}: SelectedNodeProps) => {

   const dispatch: AppDispatch = useDispatch()
   const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  
         const newColor = e.currentTarget.value
         dispatch(updateColor({ id: selectedNode.id, newColor }))
     }

  return (
         <div className="  dark:text-zinc-50 w-full  h-[80%] rounded p-1">


            <div className="h-full w-full flex flex-col gap-2  ">
                  <div className="w-full rounded pt-2">
                     <div className="flex gap-2 flex-wrap ">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => dispatch(updateColor({ id: selectedNode.id, newColor: color }))}
                                    style={{ color: color }}
                                    className="w-10 h-5 border-1 bg-zinc-700 text-[8px] rounded hover:-translate-y-0.5 transition-transform ease-in-out duration-75 "
                                >{color}</button>
                            ))}
                        </div>
                  </div>

            <div className="h-[30%] w-[30%] border  rounded">
                <input className="border-0 rounded-2xl outline-0 w-full h-full" type="color" value={selectedNode.color} onChange={handleColorChange} />
            </div>

            </div>
            
                        
                        
                    </div>
  )
}

export default Apperance
