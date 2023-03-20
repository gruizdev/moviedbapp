import React from 'react';
import styles from './MovieDetails.module.css';
import { DefaultButton, IconButton, Modal, Stack } from "@fluentui/react";
import { Rating, RatingSize } from "@fluentui/react/lib/Rating";
import { IMovie } from "../api/MovieDBApi";
import { AppContext } from '../AppContext';


export const MovieDetails = ({movie, closeModal}:{movie:IMovie, closeModal:()=>void}) => {

    const { myRatings, rateMovie, genres } = React.useContext(AppContext);
    const myRating = myRatings.find(x => x.idMovie === movie.id)?.rating;

    const [isRating, setIsRating] = React.useState(false);
    const [rating, setRating] = React.useState<number | undefined>(myRating || movie.rating);


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
            containerClassName={styles.container}
        >            
            <div className={styles.details}>
                <div className={styles.modalHeader}>
                    <h2>{movie.title}</h2>
                    <IconButton
                        styles={{root:{marginLeft:'auto', marginRight: '2px'}}}
                        iconProps={{iconName: "Cancel"}}
                        ariaLabel="Close popup modal"
                        onClick={closeModal}
                    />
                </div>
                <span>Overview</span>
                <p>{movie.overview}</p>
                <span>Genres</span>
                <p>{movie.genre_ids?.map(x => genres.find(g => g.id === x)?.name).join(", ")}</p>
                <span>Average vote</span>
                <p>{movie.vote_average}</p>                
                <div style={{textAlign: "center"}}>
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
                        <Stack 
                            horizontal 
                            horizontalAlign='center'
                            tokens={{childrenGap:10}}
                        >
                            {
                                myRating !== rating ?
                                <DefaultButton onClick={rate}>Send</DefaultButton>
                                : null
                            }
                            <DefaultButton onClick={()=>setIsRating(false)}>Cancel</DefaultButton>
                        </Stack>
                    </>
                    :
                    <DefaultButton title='Rate' onClick={()=>setIsRating(true)}>Rate</DefaultButton>
                }
                </div>
                
            </div>

        </Modal>
    );
}