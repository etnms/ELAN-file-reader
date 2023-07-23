import React from 'react';

interface TierDropdownProps {
    tiers: string[]
}
const TierDropdown: React.FC<TierDropdownProps> = ({ tiers }) => {

    return (
        <div>
            <label htmlFor='select-tier'>Tier to display</label>
            <select name='select-tier'>
                {tiers.map((element: string, index: number) =>
                    <option key={`${element}${index}`}>{element}</option>
                )}
            </select>
        </div>
    );
};

export default TierDropdown;