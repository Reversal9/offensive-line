import { Document } from "mongoose";

export interface IStatistic extends Document {
    month?: number,
    year?: string,
    position?: string,
    grade?: number,
    height?: number,
    weight?: number,
    squat?: number,
    bench?: number,
    clean?: number,
    bench_squat?: number,
    total?: number,
    jump?: number,
    reach?: number,
    vertical?: number,
    forty_a?: number,
    forty_b?: number,
    forty_average?: number,
    laser_forty?: number,
    pro_a?: number,
    pro_b?: number,
    pro_average?: number,
    group?: string,
    zero_to_ten?: number,
    ten_to_twenty?: number,
    twenty_to_thirty?: number,
    thirty_to_forty?: number,
    elite?: boolean,
    player_height_score?: number,
    active?: boolean
}