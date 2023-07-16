import xml.etree.ElementTree as ET


def get_tiers(file):
    tree = ET.parse(file)
    root = tree.getroot()
    tiers = []
    for child in root.findall('TIER'):
        tiers.append(child.attrib['TIER_ID'])
    return tiers



def get_time_slots():
    # Do something with time slots
    print()