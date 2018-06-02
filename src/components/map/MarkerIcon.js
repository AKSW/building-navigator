import L, { Point } from 'leaflet';

class MarkerIcon  {
    constructor() {
    }

    getIcon(params) {

        let category = 'building';
        let className = 'marker-icon';
        let iconSize = [25, 41];
        let iconAnchor = [12, 41];
        const popupAnchor = [0, -45];

        if (params.userMarker) {
            return L.divIcon({
                iconSize,
                iconAnchor,
                popupAnchor,
                className: 'user-marker-icon',
            });
        }

        switch (params.category) {
            case 'Bildung':
                category = 'graduation-cap';
                break;
            case 'Dienst':
                category = 'briefcase';
                break;
            case 'Gastwirtschaft':
                category = 'utensils';
                break;
            case 'Gesundheit':
                category = 'briefcase-medical';
                break;
            case 'Recht':
                category = 'balance-scale';
                break;
            case 'Verbände':
                category = 'users';
                break;
            case 'Verkehr':
                category = 'car';
                break;
            default:
                category = 'building';
        }

        if (params.size === 'small') {
            className = 'small-marker';
            iconSize = [22, 22];
            iconAnchor = [11, 22];
        }

        if (params.selected) {
            className = ' selected';
            iconSize = [31, 51];
            iconAnchor = [15, 51];
        }

        if (params.hovered) {
            className = ' hovered';
            iconSize = [31, 51];
            iconAnchor = [15, 51];
        }


        const icon = L.divIcon({
            iconSize: iconSize,
            iconAnchor: iconAnchor,
            popupAnchor:  [0, -45],
            className: className,
            html: `<i class="fa fa-${category}"></i>`
        });

        return icon;
    }
}

export default MarkerIcon;
