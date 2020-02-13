export class Delayer {
    public static delayFunc(ms : number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    } 
}