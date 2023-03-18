import React from 'react';
import styles from './MovieDetails.module.css';
import { DefaultButton, Dialog, DialogFooter, Modal, PrimaryButton } from "@fluentui/react";
import { Rating, RatingSize } from "@fluentui/react/lib/Rating";
import { IMovie } from "../api/MovieDBApi";
import { AppContext } from '../AppContext';


export const MovieDetails = ({movie, closeModal}:{movie:IMovie, closeModal:()=>void}) => {

    const { myRatings, rateMovie } = React.useContext(AppContext);
    const myRating = myRatings.find(x => x.idMovie === movie.id)?.idMovie;

    const [isRating, setIsRating] = React.useState(false);
    const [rating, setRating] = React.useState<number | undefined>(myRating);


    const rate = async () => {
        if(movie.id && rating){
            await rateMovie(movie.id, rating);
            closeModal();
        }

    }


    return (
        <Modal
            isOpen={true}
            isBlocking={false}
            onDismiss={closeModal}
            className={styles.detail}
        >
            <div>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                {
                    isRating ? 
                    <>
                        <span>Your rating: </span>
                        <Rating
                            max={10}
                            allowZeroStars={false}
                            size={RatingSize.Large}
                            onChange={(_, rate) => setRating(rate)}
                            rating={rating}
                        />
                        {
                            myRating !== rating ?
                            <DefaultButton onClick={rate}>Send</DefaultButton>
                            : null
                        }
                        <DefaultButton onClick={()=>setIsRating(false)}>Cancel</DefaultButton>
                        {/* <Dialog                            
                            hidden={!isConfirming}
                            onDismiss={()=>setIsConfirming(false)}
                            // dialogContentProps={dialogContentProps}
                            // modalProps={modalProps}
                        >
                            <DialogFooter>
                                <PrimaryButton onClick={rateMovie} text="Confirm" />
                                <DefaultButton onClick={()=>setIsConfirming(false)} text="Cancel" />
                            </DialogFooter>
                        </Dialog> */}
                    </>
                    :
                    <DefaultButton title='Rate' onClick={()=>setIsRating(true)}>Rate</DefaultButton>
                }
                
            </div>

        </Modal>
    );
}