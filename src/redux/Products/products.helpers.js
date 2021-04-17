import { firestore } from './../../firebase/utils';

export const handleAddProduct = product =>{
    return new Promise((resolve, reject) =>{
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(()=>{
                resolve()
            })
            .catch(err => {
                reject(err);
            })

    });
}

export const handleFetchProducts = ({filterTypeBF, filterTypeST, startAfterDoc, persistProducts=[] }) => {
    return new Promise((resolve,reject) => {
        const pageSize = 24;
        
        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

        if (filterTypeBF && filterTypeBF !== "undefined" && filterTypeBF !== "") ref = ref.where("buyMarket", "==", filterTypeBF);

        if (filterTypeST && filterTypeST !== "undefined" && filterTypeST !== "") ref = ref.where("sellMarket", "==", filterTypeST);


        if (startAfterDoc && startAfterDoc !== "undefined" && startAfterDoc !== "") ref = ref.startAfter(startAfterDoc);
        

        ref.get().then(snapshot =>{

                const totalCount = snapshot.size;
            
                const data = [
                    ...persistProducts,
                    ...snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            documentID: doc.id
                        }
                    })
                ];


                resolve({
                    data,
                    queryDoc: snapshot.docs[totalCount - 1],
                    isLastPage: totalCount < 1
                });
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleDeleteProduct = documentID => {
    return new Promise((resolve, reject)=>{
        firestore
            .collection('products')
            .doc(documentID)
            .delete()
            .then(() => {
                resolve();
            })
            .catch(err =>{
                reject(err);
            })
    });
}