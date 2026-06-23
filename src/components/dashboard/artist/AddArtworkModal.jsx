"use client";


import { addArtwork } from "@/lib/api/artworks";
import { imageUpload } from "@/lib/imgUpload";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export default function AddArtworkModal() {

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data)
   
    const image = await imageUpload(data.image);
    console.log(image)
    
    
    
    const artwork = {
      ...data,
      image: image.url,
      createdAt: new Date(),
    };

   
  };

  return (
    <Modal>
      <Button variant="secondary">Add New Artwork</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Add New Artwork</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <TextField className="w-full" name="title" variant="secondary">
                    <Label>Title</Label>
                    <Input placeholder="Artwork Title" required />
                  </TextField>

                  <TextField className="w-full" name="description" variant="secondary">
                    <Label>Description</Label>
                    <Input placeholder="Description" required />
                  </TextField>

                  <TextField className="w-full" name="price" type="number" variant="secondary">
                    <Label>Price</Label>
                    <Input placeholder="Price" required />
                  </TextField>

                  
                  <TextField className="w-full" name="category" variant="secondary">
                    <Label>Category</Label>
                    <select name="category" className="w-full p-2 border rounded bg-transparent">
                      <option value="Painting">Painting</option>
                      <option value="Digital">Digital</option>
                      <option value="Sculpture">Sculpture</option>
                    </select>
                  </TextField>

                  <TextField className="w-full" type="file" variant="secondary">
                    <Label>Image</Label>
                    <input name="image" type="file" required />
                  </TextField>

                  <Modal.Footer>
                    <Button slot="close" variant="secondary">Cancel</Button>
                    <Button type="submit" slot="close">Submit</Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}