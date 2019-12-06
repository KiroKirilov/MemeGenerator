import * as React from "react";
import { memo } from "react";
import { MemeRatingStatsProps } from "./meme-rating-stats-props";
import { RatingType } from "../../../models/memes/rating-type";
import { Icon } from "antd";
import classes from "./meme-rating-stats.module.scss";

export const MemeRatingStats: React.FC<MemeRatingStatsProps> = memo((props: MemeRatingStatsProps) => {
    let upvotesCount: number = 0;
    let downvotesCount: number = 0;
    let upvotePercentage: number = 0;
    const hasBeenRated: boolean = !!props.ratings && props.ratings.length > 0;

    if (hasBeenRated) {
        // @ts-ignore
        upvotesCount = props.ratings.filter((r) => r.ratingType === RatingType.Positive).length;
        // @ts-ignore
        downvotesCount = props.ratings.filter((r) => r.ratingType === RatingType.Negative).length;
        const total: number = upvotesCount + downvotesCount;
        upvotePercentage = (upvotesCount / total) * 100;
    }

    return (
        <div>
            {
                hasBeenRated
                    ? <div className={classes.statsContainer}>
                        <div className={classes.iconContainer}>
                            <Icon type="smile" /> {upvotesCount} upvotes
                        </div>

                        <div className={classes.iconContainer}>
                            <Icon type="frown" /> {downvotesCount} downvotes
                        </div>

                        <div className={classes.iconContainer}>
                            <Icon type="percentage" /> {upvotePercentage.toFixed(0)}% upvoted
                        </div>
                    </div>
                    : <div style={{ textAlign: "center" }}>No one has rated this meme yet, be the first one!</div>
            }
        </div>
    );
});
