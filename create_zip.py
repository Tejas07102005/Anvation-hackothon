import os
import zipfile

def zip_project(output_filename):
    excluded_dirs = {'node_modules', '.venv', '.git', 'dist', '__pycache__', '.pytest_cache'}
    excluded_files = {output_filename, 'migrate_theme.py', 'create_zip.py'}
    
    root_dir = os.path.dirname(os.path.abspath(__file__))
    
    print(f"Zipping project from {root_dir} to {output_filename}...")
    
    file_count = 0
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(root_dir):
            # Exclude specified directories in-place
            dirs[:] = [d for d in dirs if d not in excluded_dirs]
            
            for file in files:
                if file in excluded_files or file.endswith('.zip') or file.endswith('.pyc'):
                    continue
                
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, root_dir)
                zipf.write(full_path, rel_path)
                file_count += 1
                
    print(f"Successfully created {output_filename} containing {file_count} files!")

if __name__ == '__main__':
    zip_project('Anvation-hackothon-submission.zip')
