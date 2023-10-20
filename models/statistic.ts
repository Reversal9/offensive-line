import { IStatistic } from "../types/statistic";
import { model, Schema } from "mongoose";

const statisticSchema: Schema = new Schema(
    {
        month: {
            type: Number,
            required: false
        },
        year: {
            type: String,
            required: false
        },
        position: {
            type: String,
            required: false
        },
        grade: {
            type: Number,
            required: false
        },
        height: {
            type: Number,
            required: false
        },
        weight: {
            type: Number,
            required: false
        },
        squat: {
            type: Number,
            required: false
        },
        bench: {
            type: Number,
            required: false
        },
        clean: {
            type: Number,
            required: false
        },
        bench_squat: {
            type: Number,
            required: false
        },
        total: {
            type: Number,
            required: false
        },
        jump: {
            type: Number,
            required: false
        },
        reach: {
            type: Number,
            required: false
        },
        vertical: {
            type: Number,
            required: false
        },
        forty_a: {
            type: Number,
            required: false
        },
        forty_b: {
            type: Number,
            required: false
        },
        forty_average: {
            type: Number,
            required: false
        },
        laser_forty: {
            type: Number,
            required: false
        },
        pro_a: {
            type: Number,
            required: false
        },
        pro_b: {
            type: Number,
            required: false
        },
        pro_average: {
            type: Number,
            required: false
        },
        group: {
            type: String,
            required: false
        },
        zero_to_ten: {
            type: Number,
            required: false
        },
        ten_to_twenty: {
            type: Number,
            required: false
        },
        twenty_to_thirty: {
            type: Number,
            required: false
        },
        thirty_to_forty: {
            type: Number,
            required: false
        },
        elite: {
            type: Boolean,
            required: false
        },
        player_height_score: {
            type: Number,
            required: false
        },
        active: {
            type: Boolean,
            required: false
        },

    },
    {
        timestamps: true
    }
);

export default model<IStatistic>("Statistic", statisticSchema);