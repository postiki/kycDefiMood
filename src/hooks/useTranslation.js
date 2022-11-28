import {useStore} from 'effector-react';
import localization from '../data/localization.json';
import {lang$} from "../entities/lang";

export default function useTranslation(namespace) {
    const lang = useStore(lang$)

    return key => localization[lang][namespace][key];
}
