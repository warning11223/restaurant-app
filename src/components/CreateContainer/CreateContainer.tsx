import React, {useEffect, useState} from 'react';
import {MdCloudUpload, MdDelete, MdFastfood, MdFoodBank} from "react-icons/md";
import {categories as cat} from "../../utils/data";
import Loader from "../Loader/Loader";
import {BiDollar} from "react-icons/bi";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from "../../firebase.config";
import {addFile} from "../../utils/firebaseFunction";
import {useAppDispatch} from "../../state";
import {fetchFoodItems} from "../../state/slices/foodItemsSlice";

const CreateContainer = () => {
    const dispatch = useAppDispatch();


    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState('');
    const [calories, setCalories] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageAsset, setImageAsset] = useState<string | null>('');
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState('danger');
    const [message, setMessage] = useState('Something gone wrong...');


    const saveHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);

        const file = (e.target as HTMLInputElement)?.files!;
        const storageRef = ref(storage, `images/${Date.now()}-${file[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, file[0]);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                setFields(true);
                setMessage('Error while uploading photo, try again later...');
                setAlertStatus('danger');
                console.log(error)
                setTimeout(() => {
                    setFields(false);
                    setLoading(false);
                }, 4000)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageAsset(downloadURL);
                    setLoading(false);
                    setFields(true);
                    setMessage('Photo uploaded successfully!');
                    setAlertStatus('success');
                    setTimeout(() => {
                        setFields(false);

                    }, 5000)
                });
            }
        );
    }

    const deleteImage = () => {
        setLoading(true);
        const desertRef = ref(storage, imageAsset!);

        deleteObject(desertRef).then(() => {
            setLoading(false);
            setFields(true);
            setMessage('Photo was deleted successfully!');
            setAlertStatus('success');
            setImageAsset(null);
            setTimeout(() => {
                setFields(false);
            }, 5000)
        }).catch((error) => {
            setLoading(false);
            setFields(true);
            setMessage('Photo was not deleted successfully!');
            setAlertStatus('danger');
            setImageAsset(null);
            setTimeout(() => {
                setFields(false);
            }, 5000)
        });

    }

    const saveDetails = () => {
        setLoading(true);
        try {
            const data = {
                id: `${Date.now()}`,
                title: title,
                imageURL: imageAsset,
                category: categories,
                calories: calories,
                qty: 1,
                price: price,
            }
            addFile(data);
            setLoading(false);
            setFields(true);
            setMessage('File was successfully upload');
            setAlertStatus('success');
            clearStates();
            setTimeout(() => {
                setFields(false);
            }, 5000)

        } catch (e) {
            setLoading(false);
            setFields(true);
            setMessage('Something gone wrong, try again later...');
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
            }, 5000)
        }
    }

    const clearStates = () => {
        setTitle('');
        setCalories('');
        setCategories('');
        setPrice('');
        setImageAsset(null);
    }

    useEffect(() => {
        dispatch(fetchFoodItems());
    }, [])


    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-[90%] md:w-[70%] border border-gray-300 rounded-lg flex flex-col justify-center items-center py-5 px-4 gap-5'>

                {fields &&
                    <p className={`w-full text-center text-white py-3 rounded-lg ${alertStatus === 'danger' ? 'bg-red-600' : 'bg-emerald-400'}`}>{message}</p>
                }

                <div className='w-full h-full border-b flex items-center gap-2 ] '>
                    <MdFastfood className='text-4xl text-gray-700'/>
                    <input
                        type="text"
                        className='w-full h-full bg-transparent outline-none text-2xl text-textColor'
                        placeholder='Title'
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                </div>

                <div className='w-full text-textColor'>
                    <select
                        value={categories}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategories(e.target.value)}
                        className='w-full py-3 px-3 rounded-lg'
                    >
                        <option value="other" className='bg-white'>Select category</option>
                        {
                            cat.map(item => {
                                return <option key={item.id} value={item.urlParamName}>{item.name}</option>

                            })

                        }
                    </select>
                </div>
                <div className=' w-full h-225 md:h-400 border-dotted rounded-lg border-gray-300 border-2 flex justify-center items-center flex-col cursor-pointer'>
                    {loading ? <Loader /> :
                        (!imageAsset ?
                            <>
                                <label className='w-full h-full flex justify-center items-center flex-col gap-2'>
                                    <MdCloudUpload className='text-5xl text-textColor hover:text-gray-700 transition-all cursor-pointer'/>
                                    <p className='text-2xl text-textColor hover:text-gray-700 transition-all cursor-pointer'>Click here to upload</p>
                                    <input
                                        type="file"
                                        required
                                        className='w-0 h-0'
                                        name='uploadingImage'
                                        accept='image/*'
                                        onChange={saveHandler}
                                    />
                                </label>
                            </>
                            :
                            <>
                                <label className='relative w-full h-full flex justify-center items-center flex-col gap-2'>
                                    <img src={imageAsset} alt="image-download" className='w-60 h-60'/>
                                    <button
                                        type='button'
                                        className='absolute top-3 right-3 p-3 rounded-lg bg-red-500 text-xl cursor-pointer outline-none hover:bg-red-600 hover:shadow-md duration-500 transition-all ease-in-out'
                                        onClick={deleteImage}
                                    ><MdDelete className='text-white'/></button>
                                </label>
                            </>)
                    }
                </div>
                <div className='flex flex-col gap-5 md:flex-row md:justify-between w-full  md:gap-20'>
                    <div className='w-full h-full md:w-[50%] border-b flex items-center gap-2 '>
                        <MdFoodBank className='text-4xl text-gray-700'/>
                        <input
                            type="number"
                            className='w-full h-full bg-transparent outline-none text-2xl text-textColor'
                            placeholder='Calories'
                            value={calories}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCalories(e.target.value)}
                        />
                    </div>
                    <div className='w-full md:w-[50%] h-full border-b flex items-center gap-2 '>
                        <BiDollar className='text-4xl text-gray-700'/>
                        <input
                            type="number"
                            className='w-full h-full bg-transparent outline-none text-2xl text-textColor'
                            placeholder='Price'
                            value={price}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className='w-full h-full flex justify-center items-center'>
                    <button
                        className='w-full h-full  md:w-96 py-4 bg-emerald-500 hover:bg-emerald-400 transition-all text-lg text-white cursor-pointer rounded-lg outline-none'
                        onClick={saveDetails}
                    >Save</button>
                </div>
            </div>
        </div>
    );
};

export default CreateContainer;
