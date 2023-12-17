import { Instance, onSnapshot, types } from "mobx-state-tree";
import { UserFile, UserFileStore } from "../models/userfile/UserFileModel";
import { createContext, useContext } from "react";

const RootModel = types.model({
  userFile: UserFileStore,
});
let initialState = RootModel.create({
  userFile:{userfile:[]}
});
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const data = localStorage.getItem("rootState");
  if (data) {
    const json = JSON.parse(data);
    if (RootModel.is(json)) {
      initialState = RootModel.create(json);
    }
  }
}
export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
  localStorage.setItem("rootState", JSON.stringify(snapshot));
});

export type RootInstance = Instance<typeof RootModel>;

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
