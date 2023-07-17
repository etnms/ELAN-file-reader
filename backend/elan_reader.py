import xml.etree.ElementTree as ET
import time


def get_tiers(file):
    tree = ET.parse(file)
    root = tree.getroot()
    tiers = []
    for child in root.findall('TIER'):
        tiers.append(child.attrib['TIER_ID'])
    return tiers


def get_time_slots(file):
    tree = ET.parse(file)
    root = tree.getroot()
    time_slots_dict = {}
    timestamp_value = {}
    start_end_dict = {}
    for child in root.findall('TIME_ORDER'):
        for time_slot in child:
            time_slots_dict[time_slot.attrib['TIME_SLOT_ID']
                            ] = time_slot.attrib['TIME_VALUE']

    for child in root.findall('TIER'):
        for subchild in child:
            try:
                # Getting the timestamp values
                timestamp1 = subchild[0].attrib['TIME_SLOT_REF1']
                timestamp2 = subchild[0].attrib['TIME_SLOT_REF2']
                value1 = int(time_slots_dict.get(timestamp1)) # convert string value to int
                value2 = int(time_slots_dict.get(timestamp2))
                timevalue = value2 - value1
                # Updating the dictionary for time values
                timestamp_value[subchild[0][0].text] = timestamp_value.get(
                    subchild[0][0].text, 0) + timevalue

                start_end_dict[subchild[0][0].text] = start_end_dict.get(
                    subchild[0][0].text, "") + (f"{convert_time(value1)}-{convert_time(value2)}")

            except:
                print('Error')

    return start_end_dict


def convert_time(time_to_convert):
    time_value = int(time_to_convert) / 1000
    return time.strftime('%H:%M:%S', time.gmtime(time_value))
