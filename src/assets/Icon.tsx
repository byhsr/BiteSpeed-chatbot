
import LeftIcon from './icons/LeftIcon.svg?react'
import RightIcon from './icons/RightIcon.svg?react'
import Sun from './icons/Sun.svg?react'
import Moon from './icons/Moon.svg?react'
import Message from './icons/Text.svg?react'
import Back from './icons/back.svg?react'
import Output from './icons/output.svg?react'
import Condition from "./icons/condition.svg?react"
const IconType : Record<string , React.FC<React.SVGProps<SVGSVGElement>>> = {
    leftcollapse : LeftIcon,
    rightcollapse : RightIcon,
    lightmode:Sun,
    darkmode:Moon,
    message:Message,
    back:Back,
    output: Output,
    condition: Condition,
}

type IconProps = {
  type: string;
  className?: string;
} & React.SVGProps<SVGSVGElement>;


const Icon = ({type , className , ...props} : IconProps) => {

    const safekey = type.toLowerCase().trim() // for a safe key

    const ChosenIcon = IconType[safekey] || IconType["default"]
    if (!ChosenIcon) return null

  return  <ChosenIcon className={className} {...props} />
    
 
}

export default Icon;

//made this component to easily import icons 