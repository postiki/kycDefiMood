import {createEvent, createStore} from "effector";
export const emailConfirmationId$ = createStore<string>('')
export const addEmailConfirmationId = createEvent<string>()
export const userEmail$ = createStore<string>('')
export const addUserEmail = createEvent<string>()
export const userType$ = createStore<string>('')
export const addUserType = createEvent<string>()
export const userId$ = createStore<string>('')
export const addUserId = createEvent<string>()
export const ownerAddr$ = createStore<string>('')
export const addOwnerAddr = createEvent<string>()


emailConfirmationId$.on(addEmailConfirmationId, (_, id) => id)
userEmail$.on(addUserEmail, (_, email) => email)
userType$.on(addUserType, (_, type: any) => type.config)
userId$.on(addUserId, (_, id) => id)
ownerAddr$.on(addOwnerAddr, (_, addr) => addr)

userId$.watch((state) => state)
userType$.watch((state) => state)
