import xml.etree.ElementTree as ET
import time
from pympi import Eaf

def get_tiers(file):
    tree = ET.parse(file)
    root = tree.getroot()
    tiers = []
    for child in root.findall('TIER'):
        tiers.append(child.attrib['TIER_ID'])
    return tiers


def convert_time(time_to_convert):
    time_value = int(time_to_convert) / 1000
    return time.strftime('%H:%M:%S', time.gmtime(time_value))


def get_elan_data(file):
    eaf = Eaf(file)
    tier_names = list(eaf.get_tier_names())
    elan_data = {}
    for tier in tier_names:
        elan_data[tier] = []
        annotations = eaf.get_annotation_data_for_tier(tier)
        # Print each annotation in the list
        for annotation in annotations:

            time = annotation[0]
            time2 = annotation[1]
            annotation_value = annotation[2]            
            elan_data[tier].append({
                    'time_slot_ref1': convert_time(time),
                    'time_slot_ref2': convert_time(time2),
                    'annotation_value': annotation_value
                })

    return elan_data