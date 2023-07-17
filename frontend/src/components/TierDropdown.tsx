interface ITierDropdownProps {
    tiers: string[]
}

const TierDropdown = (props: ITierDropdownProps) => {
    const { tiers } = props;

    const renderTiers = () => {
        return tiers.map((element: string, index: number) => {
            return <option key={`${element}${index}`}>{element}</option>
        })
    }
    return (
        <div>
            <label htmlFor='select-tier'>Tier to display</label>
            <select name='select-tier'>
                {renderTiers()}
            </select>
        </div>
    );
};

export default TierDropdown;