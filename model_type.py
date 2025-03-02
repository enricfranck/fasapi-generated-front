import os
import re
from typing import List, Optional
from pydantic import BaseModel


class AttributesModel(BaseModel):
    """Represents a column in a database table using Pydantic."""

    name: str
    type: str
    length: Optional[int] = None
    is_primary: bool = False
    is_indexed: bool = False
    is_auto_increment: bool = False
    is_required: bool = True
    is_unique: bool = False
    is_foreign: bool = False
    foreign_key_class: Optional[str] = None
    foreign_key: Optional[str] = None


class ClassModel(BaseModel):
    """Represents a database table model using Pydantic."""

    name: str
    attributes: List[AttributesModel]

    @property
    def column_type_list(self) -> str:
        """Get unique SQLAlchemy column types used in the model."""
        types = set()
        for attr in self.attributes:
            types.add(attr.type)
        return ", ".join(types)

def preserve_custom_sections(file_path: str, new_content: str) -> str:
    """Preserve custom sections (e.g., # begin # .... # end #) in the file."""

    top_section_default = f"# begin #\n# ---write your code here--- #\n# end #"
    if not os.path.exists(file_path):
        return top_section_default + "\n\n" + new_content + "\n\n" + top_section_default + "\n"

    with open(file_path, "r") as f:
        existing_content = f.read()

    # Use regex to find and preserve custom sections
    section_pattern = r"#\s+begin\s+#.*?#\s+end\s+#"
    sections = re.findall(section_pattern, existing_content, re.DOTALL)

    # Ensure we have exactly two sections (top and bottom)
    if len(sections) != 2:
        return top_section_default + "\n\n" + new_content + "\n\n" + top_section_default + "\n"  # If sections are not found or
        # invalid, return new content

    top_section = sections[0]  # First section is the top
    bottom_section = sections[1]  # Second section is the bottom

    # Combine new content with preserved sections
    final_content = top_section + "\n\n" + new_content + "\n\n" + bottom_section + "\n"

    return final_content


def snake_to_camel(snake_str):
    """Convert snake_case string to CamelCase."""
    return ''.join(word.capitalize() for word in snake_str.split('_'))


def camel_to_snake(name):
    """Convert CamelCase to snake_case."""
    snake_case = ""
    for i, char in enumerate(name):
        if char.isupper() and i != 0:
            snake_case += "_"
        snake_case += char.lower()
    return snake_case
