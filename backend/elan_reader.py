import xml.etree.ElementTree as ET
import time


def get_tiers(file):
    tree = ET.parse(file)
    root = tree.getroot()
    tiers = []
    for child in root.findall('TIER'):
        tiers.append(child.attrib['TIER_ID'])
    return tiers


def get_elan_slots(file):
    tree = ET.parse(file)
    root = tree.getroot()
    elan_data = {}
    time_slots_dict = {}

    # Extract time slot values
    for time_order in root.findall('TIME_ORDER'):
        for time_slot in time_order.findall('TIME_SLOT'):
            time_slot_id = time_slot.attrib['TIME_SLOT_ID']
            time_value = time_slot.attrib['TIME_VALUE']
            time_slots_dict[time_slot_id] = convert_time(time_value)

    # Process tiers and annotations
    for tier in root.findall('TIER'):
        tier_id = tier.attrib['TIER_ID']
        elan_data[tier_id] = []

        for annotation in tier.findall('ANNOTATION'):
            annotation_type = annotation.find('ALIGNABLE_ANNOTATION') or annotation.find('REF_ANNOTATION')

            if annotation_type is not None:
                annotation_id = annotation_type.attrib['ANNOTATION_ID']
                annotation_value = annotation_type.find('ANNOTATION_VALUE').text

                if annotation_type.tag == 'ALIGNABLE_ANNOTATION':
                    time_slot_ref1 = annotation_type.attrib['TIME_SLOT_REF1']
                    time_slot_ref2 = annotation_type.attrib['TIME_SLOT_REF2']
                    time_slot_ref1_value = time_slots_dict.get(time_slot_ref1)
                    time_slot_ref2_value = time_slots_dict.get(time_slot_ref2)
                elif annotation_type.tag == 'REF_ANNOTATION':
                    annotation_ref = annotation_type.attrib['ANNOTATION_REF']
                    referenced_annotation = root.find(f'.//*[@ANNOTATION_ID="{annotation_ref}"]')
                    # Using get method to avoid crashing when looking for attribute that may not exist
                    # This is the case for symbolic subdivision in ELAN
                    time_slot_ref1 = referenced_annotation.attrib.get('TIME_SLOT_REF1')
                    time_slot_ref2 = referenced_annotation.attrib.get('TIME_SLOT_REF2')
                    time_slot_ref1_value = time_slots_dict.get(time_slot_ref1, None)
                    time_slot_ref2_value = time_slots_dict.get(time_slot_ref2, None)
                    # TO DO: Deal with it in a better way to display the data

                elan_data[tier_id].append({
                    'annotation_id': annotation_id,
                    'time_slot_ref1': time_slot_ref1_value,
                    'time_slot_ref2': time_slot_ref2_value,
                    'annotation_value': annotation_value
                })
    return elan_data


def convert_time(time_to_convert):
    time_value = int(time_to_convert) / 1000
    return time.strftime('%H:%M:%S', time.gmtime(time_value))
