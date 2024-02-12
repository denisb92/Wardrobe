export function getColor(colorCoded)
{
    colorCoded = colorCoded.toLowerCase();
    
    if(colorCoded === 'brown')
        return 'amber-900';
    if(colorCoded === 'black')
        return 'black';
    else
        return colorCoded + '-400';

}